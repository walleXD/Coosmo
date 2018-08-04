import { createMemoryHistory } from "history"
import createUUID, { DNS } from "uuid/v3"

import allReducers from "../reducers"
import allEpics from "../epics"
import initNaut from "../naut"
import createStore from "../utils/initStore"

import "react-virtualized/styles.css" // only needs to be imported once
import "typeface-roboto/index.css"
import "material-design-icons/iconfont/material-icons.css"

export default () => {
  const history = createMemoryHistory()
  const deviceId = createUUID(process.env.USER, DNS).slice(16)
  const coosmonautConfig = {
    clientId: process.env.REDDIT_CLIENT_ID,
    deviceId
  }
  const coosmonaut = initNaut(coosmonautConfig)
  const store = createStore({ allReducers, allEpics }, { history, coosmonaut })

  return { history, store }
}
