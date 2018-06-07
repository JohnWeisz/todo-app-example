# Todo-App Example

A small Todo-list example web-app, built with ESNext, React, Redux, and Material-UI next. Built as a part of my application for a contract job at [Flexhire](https://flexhire.com), a sleek platform for pre-screened freelance developers and designers ([hire a freelancer](https://flexhire.com/signup/client), or [join as a freelancer](https://flexhire.com/signup/freelancer)).

![Screenshot](/dist/app-screenshot.png "Screenshot")

## Features

 - Add, change, remove items from your Todo list
 - Set due date, monitor with live countdown
 - Mark items as high priority

## Installation & Building

To use this app, you need NodeJS and npm on your machine.

 1. Clone this repository to your local folder
 2. Install dependencies by running `npm install -D` in the root folder of this project (i.e. where `package.json` is located)
 3. Run `npm start` to open the app in your browser

## App Architecture

The client app functionality is encapsulated inside the `TodoApp` class in the `app.js` file. The `TodoApp` class is responsible for rendering the app into a specified DOM-container, as well as instantiating the Redux store to manage app state.

External dependencies, such as data persistence and account management, are supplied to the `TodoApp` through a simple dependency injection pattern. This example simply uses the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API to implement this in the `index.js` file, but it can be replaced with more robust, remote-API-based solutions. This makes it feasible to distribute the app on multiple platforms, such as web, Electron, and PhoneGap, as the external dependencies can be easily defined per platform.

The UI code is separated into a left *menu* bar and a right *content* bar, with the *content* part further separated into multiple *areas* (such as *TodoList* displaying the actual Todo items, and *Settings* displaying the available app settings).

## Build System

The app is built through a simple 2-step babel+webpack config, all handled internally by webpack through the configuration. To build without starting, simply webpack it:

```
webpack
```

## License

Licensed under the MIT license.
