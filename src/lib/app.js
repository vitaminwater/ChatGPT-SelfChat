if (typeof browser === "undefined") {
  var browser = chrome;
}

const defaultTabData = {
  'question': '',
  'talker-1-name': 'Phil',
  'talker-1-greeting': `Ok today your name is {name} and my name is {other}, we're both associates and know each other well. We are discussing like talking humans, so no bullet points, only one paragraph, be short and concise (max 300 characters) and don't repeat yourself or what I say in my replies. Here's the problem we want to resolve:\n\n"{firstMessage}".`,
  'talker-2-name': 'Joe',
  'talker-2-greeting': `Ok today your name is {name} and my name is {other}, we're both associates and know each other well. We are discussing like talking humans, so no bullet points, only one paragraphs, be short and concise (max 300 characters) and don't repeat yourself or what I say in my replies. Here is my first message:\n\n"{firstMessage}".`,
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
