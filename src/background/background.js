if (typeof browser === "undefined") {
  var browser = chrome;
}

const names = ['Phil', 'Joe']
let question
let tabs = []

const startChat = () => {
  browser.runtime.onMessage.addListener(async (message, sender) => {
    console.log('Received message backend: ', message)
    if (message.type == 'start') {
      question = message.question
      tabs[0] = (await browser.windows.create({
        url: 'https://chat.openai.com/chat',
        left: 0,
        top: 0,
        width: 900,
        height: 1000,
      })).tabs[0]
      tabs[1] = (await browser.windows.create({
        url: 'https://chat.openai.com/chat',
        left: 900,
        top: 0,
        width: 900,
        height: 1000,
      })).tabs[0];
    } else if (message.type == 'ready') {
      if (sender.tab.id == tabs[0].id) {
        console.log('Sending question to first tab: ', question)
        await browser.tabs.sendMessage(tabs[0].id, { type: 'init', text: question, name: names[0], other: names[1] })
      } else {
        await browser.tabs.sendMessage(tabs[1].id, { type: 'init', name: names[1], other: names[0] })
      }
    } else if (message.type == 'replied') {
      await browser.tabs.sendMessage((sender.tab.id == tabs[0].id ? tabs[1] : tabs[0]).id, { type: "replied", text: message.text })
    }
  });
}

export default startChat
