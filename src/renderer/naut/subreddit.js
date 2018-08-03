import fetch from "cross-fetch"

export const getPosts = client => async ({ subreddit, sort }) => {
  const url = `https://api.reddit.com/r/${subreddit}`
  const accessToken = client.getAuthTokens()
  console.log(accessToken)
  const fetchConfig = {
    method: "get",
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  }
  const rawResponse = await fetch(url, fetchConfig)
  const { data, ...rest } = await rawResponse.json()
  console.log(data, rest)
  if (!data) throw new Error(`${rest.error}: ${rest.message}`)
  return data
}
