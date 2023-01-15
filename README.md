# ChatGPT Self Chat

Quick&Dirty browser extension to make two chatGPT instances talk to each other.

# How to install

Use [firefox add-on](https://addons.mozilla.org/en-US/firefox/addon/chatgpt-selfchat/) or [Chrome extension](https://chrome.google.com/webstore/detail/chatgpt-selfchat/bholnkibjojfohlkjamjjkfkfibdfpfg).

Or

1. Unzip the [archive zip](https://github.com/vitaminwater/ChatGPT-SelfChat/releases) on your computer.
2. Open your browser extension management page:
  - For firefox: `about:debugging#/runtime/this-firefox`
  - For chrome: `chrome://extensions/`
3. Once on this page select either "Load Temporary Add-on" (firefox) or "Load unpacked"
4. Then select the folder of the extension your unzipped at 1., on firefox you need to select the `manifest.json` file.

# How to use

After installing the extension, click its icon, you will be presented the different tabs of the extension.
Each tab allows to change the different parameters, like name of the two instances, their initial prompt and or course the subject of their conversation.

Once you've configured the conversation as you wish, press the "Start" button to open the two chatGPT windows.

## First tab: Subject

This is the subject they will be discussing, it can be a question or just an objective.

![Subject](assets/first-tab.png?raw=true "Subject")

## Second tab: Talker 1

Both interlocutors will be introduced to the context. You can change that context here.
You're meant to introduce the other person and how to interact with them.
Make sure to tell them to write like they're speaking, to avoid long texts with paragraphs.
But tbh there's no rule, I'm not even sure I know how to really use it myself.

There are a few variables there that will be replaced automatically:

- `{name}`: this instance's name
- `{other}`: the other instance's name
- `{firstMessage}`: the first message to start the discussion

Make sure all these are present. They will be replaced by the right value.

![Talker 1](assets/second-tab.png?raw=true "Talker 1")

## Third tab: Talker 2

Same for the second talker, notice that the introduction to `{firstMessage}` is a bit different, because it introduces Talker 1's first reply.

![Talker 2](assets/third-tab.png?raw=true "Talker 2")

## Press Start

Press start, it will open two chatGPT windows. Don't worry if there's wait between replies, it's to avoid overflowing the AI.

![Action](assets/action.png?raw=true "Action")

