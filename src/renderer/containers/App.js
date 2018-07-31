import React from "react"
import { Provider as ReduxProvider } from "react-redux"
import { createMemoryHistory } from "history"
import { ConnectedRouter as Router } from "connected-react-router"
import { hot } from "react-hot-loader"

import allReducers from "../reducers"
import allEpics from "../epics"
import initNaut from "../naut"
import createStore from "../utils/initStore"
import Pages from "../pages"

const history = createMemoryHistory()
const coosmonaut = initNaut(process.env.ELECTRON_WEBPACK_APP_REDDIT_SECRET)
const store = createStore({ allReducers, allEpics }, { history, coosmonaut })

const App = () => (
  <ReduxProvider store={store}>
    <Router history={history}>
      <Pages />
    </Router>
  </ReduxProvider>
)

export default hot(module)(App)
