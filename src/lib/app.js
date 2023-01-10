if (typeof browser === "undefined") {
  var browser = chrome;
}

const showTab = (name) => {
}

const defaultTabData = {
  'question': '',
  'talker-1-name': 'Phil',
  'talker-1-greeting': `Ok today your name is {name} and you will be discussing with {other}, you're both associates and know each other well. You are discussing like humans, so no bullet points, only paragraphs, be short and concise and don't repeat yourself or what {other} says. Here's the problem you want to resolve:\n\n"{firstMessage}".`,
  'talker-2-name': 'Joe',
  'talker-2-greeting': `Ok today your name is {name} and you will be discussing with {other}, you're both associates and know each other well. You are discussing like humans, so no bullet points, only paragraphs, be short and concise and don't repeat yourself or what {other} says. Here is {other}'s first message:\n\n"{firstMessage}".`,
}

const tabData = Object.assign({}, defaultTabData)

const saveTabData = () => {
  window.localStorage.setItem("tabData", JSON.stringify(tabData))
}

const loadTabData = () => {
  const tabDataJSON = window.localStorage.getItem("tabData")
  if (tabDataJSON) {
    Object.assign(tabData, JSON.parse(tabDataJSON))
  }
}

const setupValues = () => {
  Object.keys(tabData).forEach(k => {
    const td = tabData[k]
    const el = document.getElementById(k)
    if (el) {
      el.value = td
      el.addEventListener('change', e => {
        tabData[k] = e.target.value
        saveTabData()
      })
    }
  })
}

export class App {
  render() {
    loadTabData()
    setupValues()
    document.getElementById('start').addEventListener('click', (e) => {
      const question = document.getElementById('question').value
      browser.runtime.sendMessage(Object.assign({ type: "start"}, tabData))
    })
    document.getElementById('reset').addEventListener('click', (e) => {
      Object.assign(tabData, defaultTabData)
      saveTabData()
      setupValues()
    })
    Array.from(document.getElementsByClassName('tab')).forEach(t => {
      document.getElementById(t.id).addEventListener('click', (e) => {
        Array.from(document.getElementsByClassName('tab')).forEach(t => {
          t.style.fontWeight = e.target.id == t.id ? 'bold' : 'normal'
          document.getElementById(t.id.replace('-tab', '')).style.display = e.target.id == t.id ? 'block' : 'none'
          setupValues()
        })
      })
    })
  }
}
