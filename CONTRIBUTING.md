# Contributing to Lifemaker repo

First of all, thank you for helping with Lifemaker project!

We are working to improve this document, and if you find any part of it confusing, or if you can't figure out how to get started with something, then rest assured it's not you, it's us! Please open up a new issue to describe what you were hoping to contribute with, and what you're wondering about, and we'll figure out together how to improve the documentation.

## Basic architecture

- `node.js` for backend
- `elasticsearch` is being used for database
- `react-native` for creating the android app
- `socket.io` for communicating between client and server

## Folder structure
The `android` folder contains the react-native code and the `backend` folder contains the code for server side logic.

## Setting up dev environment

- Install elasticsearch, node, react-native on your machine and `npm install` on both backend and frontend side.

- Change the ip mentioned in `/lifemaker/android/config.js` to your machine's ip or wherever the backend is running.

- Start the backend in debug mode.

```bash
DEBUG=* node lib/setupConsumers.js
```

- Start elasticsearch.

If you have used brew as your package manager
```bash
brew services start elasticsearch
```

- Start frontend.

```bash
react-native run-android
```

## Debugging issues on dev environment
- I see only a spinning icon when the emulator application
The android app is not getting connected to the backend. Check the ip in `/lifemaker/android/config.js`.

- I see a message on my mobile saying that I cannot download the js resources.

The mobile is not able to speak to your dev machine using the 8081 port. Run
`adb reverse tcp:8081 tcp:8081` and check again.
