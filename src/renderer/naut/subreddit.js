import fetch from "cross-fetch"

export const getPosts = client => async ({ subreddit, sort }) => {
  const url = `https://api.reddit.com/r/${subreddit}/${sort || ""}`
  const fetchConfig = {
    method: "get",
    headers: {
      Authorization: `bearer ${client.getAuthTokens().accessToken}`
    }
  }
  try {
    const rawResponse = await fetch(url, fetchConfig)
    const { data } = await rawResponse.json()
    console.log(data)
    return data
  } catch (e) {
    throw new Error(e.message)
  }
}
