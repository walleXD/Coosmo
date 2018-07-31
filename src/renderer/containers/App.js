import React from "react"
import { Provider as ReduxProvider } from "react-redux"
import { ConnectedRouter as Router } from "connected-react-router"
import { hot } from "react-hot-loader"

import Pages from "../pages"
import initApp from "../utils/initApp"

const { store, history } = initApp()

const App = () => (
  <ReduxProvider store={store}>
    <Router history={history}>
      <Pages />
    </Router>
  </ReduxProvider>
)

export default hot(module)(App)
