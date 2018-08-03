import React from "react"
import { render } from "react-dom"
import { Provider as ReduxProvider } from "react-redux"

import initApp from "./utils/initApp"

import App from "./containers/App"

const { store, history } = initApp()

render(
  <ReduxProvider store={store}>
    <App history={history} />
  </ReduxProvider>,
  document.getElementById("app")
)
