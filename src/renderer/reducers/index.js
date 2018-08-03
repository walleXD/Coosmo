import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"

import subredditReducer from "../features/SubredditLoader/reducer"

export default {
  form: formReducer,
  knot: combineReducers({ subreddits: subredditReducer })
}
