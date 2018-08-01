import {
  setPosts as setPostsType,
  setLoadingState as setLoadingStateType,
  setErrorState as setErrorStateType
} from "./types"

// import { getPosts as nautGetPosts } from "../../naut"

export const setPosts = payload => ({
  type: setPostsType,
  payload
})

export const setLoadingState = payload => ({
  type: setLoadingStateType,
  payload
})

export const setErrorState = payload => ({
  type: setErrorStateType,
  payload
})

export const getPosts = payload => dispatch => {}
