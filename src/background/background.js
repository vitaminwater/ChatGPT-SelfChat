if (typeof browser === "undefined") {
  var browser = chrome;
}

let chatData
let tabs = []

const startChat = () => {
  browser.runtime.onMessage.addListener(async (message, sender) => {
    try {
      console.log('Received message backend: ', message)
      if (message.type == 'start') {
        chatData = message
        let win1 = await browser.windows.create({
          url: 'https://chat.openai.com/chat',
          left: 0,
          top: 0,
          width: 900,
          height: 1000,
        })
        console.log(win1)
        tabs[0] = win1.tabs[0]
        const win2 = await browser.windows.create({
          url: 'https://chat.openai.com/chat',
          left: 900,
          top: 0,
          width: 900,
          height: 1000,
        })
        console.log(win2)
        tabs[1] = win2.tabs[0];
      } else if (message.type == 'ready') {
        if (sender.tab.id == tabs[0].id) {
          console.log('Sending question to first tab: ', chatData.question)
          await browser.tabs.sendMessage(tabs[0].id, { type: 'init', text: chatData.question, name: chatData['talker-1-name'], other: chatData['talker-2-name'], greeting: chatData['talker-1-greeting'] })
        } else {
          await browser.tabs.sendMessage(tabs[1].id, { type: 'init', name: chatData['talker-2-name'], other: chatData['talker-1-name'], greeting: chatData['talker-2-greeting'] })
        }
      } else if (message.type == 'replied') {
        await browser.tabs.sendMessage((sender.tab.id == tabs[0].id ? tabs[1] : tabs[0]).id, { type: "replied", text: message.text })
      }
    } catch(e) {
      console.log(e)
    }
  });
}

export default startChat
