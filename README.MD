# Todo-App Example

A small Todo-list example web-app, built with ESNext, React, Redux, and Material-UI next.

![Screenshot](/dist/app-screenshot.png "Screenshot")

## Features

 - Add, change, remove items from your Todo list
 - Set due date, monitor with live countdown
 - Mark items as high priority

## Installation & Building

To build this app, you need NodeJS and npm on your machine.

 1. Clone this repository to your local folder
 2. Install dependencies by running `npm install -D` in the root folder of this project (i.e. where `package.json` is located)
 3. Run `npm start` to open the app in your browser

## App Architecture

The client app functionality is encapsulated inside the `TodoApp` class in the `app.js` file. The `TodoApp` class is responsible for rendering the app into a specified DOM-container, as well as instantiating the Redux store to manage app state.

External dependencies, such as data persistence, are supplied to the `TodoApp` through a simple dependency injection pattern. This example simply uses the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API to implement this in the `index.js` file, but it can be replaced with more robust, remote-API-based solutions. This makes it feasible to distribute the app on multiple platforms, such as web, Electron, and PhoneGap, as the external dependencies can be easily defined per platform.

The UI code is separated into a left *menu* bar and a right *content* bar, with the *content* part further separated into multiple *areas* (such as *TodoList* displaying the actual Todo items, and *Settings* displaying the available app settings).

## Build System

The app is built through a simple 2-step babel+webpack config, all handled by webpack + plugins through the configuration. To build without starting, simply webpack it:

```
webpack
```

## License

Licensed under the MIT license.

-----

## *Personal Notes*

*This app is based a slightly different (and considerably simpler) stack than what I usually use, and may showcase some trivial mistakes in the redux-system architecture department.*

*While this example app uses ES6, Babel, and Redux, I usually roll with TypeScript and a custom, multi-store, mutable-state, and typed flux system, based on decorators and type metadata reflection. This flux system is extremely performance-oriented, and is designed especially for the case where thousands of components are rendered, and actions are dispatched at very high frequency (several actions per second at times).*

*Although this custom flux system is not public at this time, it looks something like this from the store side:*

```ts
export class TodoListStore extends Store<TodoListState>
{
    @actionHandler
    private handleTodoItemCreate(action: TodoListItemCreateAction)
    {
        this.state.items.set(...);
        this.emitChange();
    }
    
    ...
}
```

*It also comes with a `connect` HOC similar to Redux (except more performance-oriented), and a context-based dependency-injection system. The framework also includes simple testing tools for `@actionHandler` methods (based on a `state+action=newState` principle, which is very similar to how Redux reducers are tested).*

*The most notable user of this flux framework (and essentially the _only_ serious user) is [AudioNodes](https://audionodes.com/), a web- and Electron-based modular digital audio workstation.*
