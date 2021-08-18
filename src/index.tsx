import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, { MainState } from './redux/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Statement } from 'typescript';

let rerenderEntireTree = (state : MainState) => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} dispatch={store.dispatch.bind(store)}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

rerenderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
