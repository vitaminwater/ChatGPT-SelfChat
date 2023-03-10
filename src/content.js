if (typeof browser === "undefined") {
  var browser = chrome;
}

const start = async () => {
  let nMessages = 0
  let isReplier = false
  let name, other, greeting

  console.log('Start')
  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    try {
      console.log('Received message content: ', message)
      if (message.type == 'init') {
        isReplier = !message.text
        name = message.name
        other = message.other
        greeting = message.greeting
        await new Promise(r => setTimeout(r, 2000))
        if (message.text) {
          await addMessage(greeting.replaceAll('{name}', name).replaceAll('{other}', other).replaceAll('{firstMessage}', message.text))
        }
      } else if (message.type == 'replied') {
        const first = !nMessages
        nMessages++
        if (first && isReplier) {
          await addMessage(greeting.replaceAll('{name}', name).replaceAll('{other}', other).replaceAll('{firstMessage}', message.text))
        } else {
          await addMessage(message.text)
        }
      }
    } catch(e) {
      console.log(e)
    }
  });

  await new Promise(r => setTimeout(r, 2000))
  await browser.runtime.sendMessage({type: 'ready'}, response => {
    console.log('First question:', response.question)
    addMessage(response.question)
  })
}

const addMessage = async (text, ignoreReply) => {
  try {
    document.querySelector('textarea').value = text
    await new Promise(r => setTimeout(r, 2000))
    document.querySelector('textarea + button').click()
    await new Promise(r => setTimeout(r, 1000))
    await waitCompleteResponse()
    if (ignoreReply) {
      return
    }
    let reply
    while (true) {
      console.log('Looking for reply')
      await new Promise(r => setTimeout(r, 1000))
      const proses = document.getElementsByClassName('prose')
      if (proses.length == 0) {
        console.log('Cant find reply!')
        continue
      }
      reply = proses[proses.length-1].innerText
      break
    }
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
