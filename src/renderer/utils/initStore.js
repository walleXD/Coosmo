import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createEpicMiddleware } from "redux-observable"

export default (
  { allReducers, allEpics },
  { history, coosmonaut },
  preloadedState = {},
  isDev = process.env.NODE_ENV !== "production"
) => {
  const reducers = combineReducers(allReducers)
  const epicMiddleware = createEpicMiddleware({
    dependencies: { coosmonaut }
  })

  // Middlewares setup
  const prodMiddlewares = [
    routerMiddleware(history),
    epicMiddleware,
    thunkMiddleware.withExtraArgument({ coosmonaut })
  ]
  const devMiddlewares = [
    require("redux-logger").default,
    require("redux-immutable-state-invariant").default()
  ]
  const middlewares = [...prodMiddlewares, ...(isDev ? devMiddlewares : [])]

  // Setup store
  const store = createStore(
    connectRouter(history)(reducers),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )

  epicMiddleware.run(allEpics)

  return store
}
