#!/bin/bash

pnpm app:firefox
cd dist && zip -r ../chatGPT-self-chat-firefox.zip . && cd -
pnpm app:chrome
cd dist && zip -r ../chatGPT-self-chat-chrome.zip . && cd -
