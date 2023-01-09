if (typeof browser === "undefined") {
  var browser = chrome;
}

export class App {
  render() {
    document.getElementById('start').addEventListener('click', (e) => {
      const question = document.getElementById('question').value
      browser.runtime.sendMessage({ type: "start", text: question })
    })
  }
}
