import { setPosts, setErrorState, setLoadingState } from "./types"
const initialState = {
  loadingPosts: false,
  error: ""
  // nyc: {
  //   before: "",
  //   after: "",
  //   posts: []
  // }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case setPosts:
      return {
        ...state,
        [payload.subreddit]: {
          posts: [
            ...(typeof state[payload.subreddit] === "undefined"
              ? []
              : state[payload.subreddit].posts),
            ...payload.posts
          ],
          before: payload.before,
          after: payload.after
        }
      }
    case setLoadingState:
      return { ...state, loadingPosts: payload }
    case setErrorState:
      return { ...state, error: payload }
    default:
      return state
  }
}
