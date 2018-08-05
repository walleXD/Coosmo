import fetch from "cross-fetch"
import { URL, URLSearchParams } from "url"

export const getPosts = client => async ({
  subreddit,
  sort,
  before,
  after
}) => {
  const url = `https://api.reddit.com/r/${subreddit}/${sort || ""}`
  const fetchURL = new URL(url)
  const fetchParams = {
    after,
    before
  }
  fetchURL.search = new URLSearchParams(fetchParams)
  const accessToken = client.getAuthTokens()
  const fetchConfig = {
    method: "get",
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  }
  const rawResponse = await fetch(fetchURL, fetchConfig)
  const { data, ...rest } = await rawResponse.json()
  // console.log(data, rest)
  if (!data) throw new Error(`${rest.error}: ${rest.message}`)
  return data
}
