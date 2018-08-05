import {
  setPosts as setPostsType,
  setLoadingState as setLoadingStateType,
  setErrorState as setErrorStateType
} from "./types"

import { getPosts as nautGetPosts } from "../../naut"

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

export const getPosts = payload => async (
  dispatch,
  getState,
  { coosmonaut }
) => {
  const { subreddit, after: afterParam, before: beforeParam } = payload
  try {
    dispatch(setLoadingState(true))
    const { children: posts, before, after } = await nautGetPosts(coosmonaut)({
      subreddit,
      after: afterParam,
      before: beforeParam
    })
    dispatch(setLoadingState(false))
    dispatch(setPosts({ subreddit, posts, before, after }))
  } catch (e) {
    dispatch(setLoadingState(false))
    dispatch(setErrorState(e.message))
  }
}
