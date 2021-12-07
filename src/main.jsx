import React from 'react'
import ReactDom from 'react-dom'
import store from "./store"
import { Provider } from  "react-redux"
import {HashRouter} from "react-router-dom";

import "./scss/index.scss"
// import "tailwindcss/tailwind.css"

import App from './App'
import './index.css'


ReactDom.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('app')
)
