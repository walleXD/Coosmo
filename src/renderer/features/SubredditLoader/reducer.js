import { setPosts, setErrorState, setLoadingState } from "./types"
const initialState = {
  loadingPosts: false,
  error: "",
  subreddits: {
    // nyc: {
    //   before: "",
    //   after: "",
    //   posts: []
    // }
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case setPosts:
      return {
        ...state,
        subreddits: {
          ...state.subreddits,
          [payload.subreddit]: {
            posts: payload.more
              ? payload.posts
              : [
                  ...state.subreddits[payload.subreddit].posts,
                  ...payload.posts
                ],
            before: payload.before,
            after: payload.after
          }
        }
      }
    case setLoadingState:
      return { ...state, loadingPosts: payload.isLoading }
    case setErrorState:
      return { ...state, error: payload.error }
    default:
      return state
  }
}
