if (typeof browser === "undefined") {
  var browser = chrome;
}

const showTab = (name) => {
}

const tabData = {
  'question': '',
  'talker-1-name': 'Phil',
  'talker-1-greeting': `Ok today your name is {name} and you will be discussing with {other}, you're both associates and know each other well. You are discussing like humans, so no bullet points, only paragraphs, be short and concise and don't repeat yourself or what {other} says. You also have an employee called Stant that can do real-world tasks to reach the goal. Here's the problem you want to resolve:\n\n"{firstMessage}".`,
  'talker-2-name': 'Joe',
  'talker-2-greeting': `Ok today your name is {name} and you will be discussing with {other}, you're both associates and know each other well. You are discussing like humans, so no bullet points, only paragraphs, be short and concise and don't repeat yourself or what {other} says. You also have an employee called Stant that can do real-world tasks to reach the goal. Here is {other}'s first message:\n\n"{firstMessage}".`,
}

const setupValues = () => {
  Object.keys(tabData).forEach(k => {
    const td = tabData[k]
    const el = document.getElementById(k)
    if (el) {
      el.value = td
      el.addEventListener('change', e => {
        tabData[k] = e.target.value
      })
    }
  })
}

export class App {
  render() {
    setupValues()
    document.getElementById('start').addEventListener('click', (e) => {
      const question = document.getElementById('question').value
      browser.runtime.sendMessage(Object.assign({ type: "start"}, tabData))
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
