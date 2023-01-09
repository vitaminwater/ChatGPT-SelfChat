if (typeof browser === "undefined") {
  var browser = chrome;
}

const start = async () => {
  let nMessages = 0
  let isReplier = false
  let name, other

  console.log('Start')
  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log('Received message content: ', message)
    if (message.type == 'init') {
      isReplier = !message.text
      name = message.name
      other = message.other
      if (message.text) {
        await addMessage(`Ok today your name is ${name} and you will be discussing with ${other}, you're both associates and know each other well. You are discussing like humans, so no bullet points, only paragraphs, be short and concise and don't repeat yourself or what ${other} says. You also have an employee called Stant that can do real-world tasks to reach the goal. Here's the problem you want to resolve:\n\n"${message.text}".`)
      }
    } else if (message.type == 'replied') {
      console.log('nMessages', nMessages)
      const first = !nMessages
      nMessages++
      console.log('nMessages', nMessages)
      if (first && isReplier) {
        await addMessage(`Ok today your name is ${name} and you will be discussing with ${other}, you're both associates and know each other well. You are discussing like humans, so no bullet points, only paragraphs, be short and concise and don't repeat yourself or what ${other} says. You also have an employee called Stant that can do real-world tasks to reach the goal. Here is ${other}'s first message:\n\n"${message.text}".`)
      }
      await addMessage(message.text)
    }
  });

  await browser.runtime.sendMessage({type: 'ready'}, response => {
    console.log('First question:', response.question)
    addMessage(response.question)
  })
}

const addMessage = async (text, ignoreReply) => {
  try {
    document.querySelector('textarea').value = text
    document.querySelector('textarea + button').click()
    await new Promise(r => setTimeout(r, 1000))
    await waitCompleteResponse()
    if (ignoreReply) {
      return
    }
    const proses = document.getElementsByClassName('prose')
    const reply = proses[proses.length-1].innerText
    await new Promise(r => setTimeout(r, 1000 * reply.split(' ').length/5))
    await browser.runtime.sendMessage({type: 'replied', text: reply})
  } catch(e) {
    console.log(e)
  }
}

const waitCompleteResponse = async () => {
  try {
    while (true) {
      const loading = !document.querySelector('textarea + button > svg')
      console.log('Loading', loading)
      if (!loading) {
        break
      }
      await new Promise((r) => setTimeout(r, 300))
    }
  } catch(e) {
    console.log(e)
  }
}

if (document.readyState !== "complete") {
  window.addEventListener("load", event => {
    start()
  });
} else {
  start()
}
