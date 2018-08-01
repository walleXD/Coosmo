import { Base64 } from "js-base64"
import { URL, URLSearchParams } from "url"
import fetch from "cross-fetch"

export default ({ clientId = "", deviceId = "", clientType = "app" }) => {
  const data = {
    clientType,
    clientId,
    tokens: {
      accessToken: "",
      refreshToken: ""
    },
    loggedIn: false
  }

  // get stored data
  const getAuthTokens = () => data.tokens

  const isLoggedIn = () => data.loggedIn

  const setAuthTokens = tokens => {
    data.tokens = tokens
  }

  // actions with auth info
  const fetchAuthTokens = async () => {
    const redditTokenURL = "https://www.reddit.com/api/v1/access_token"
    const fetchTokenURL = new URL(redditTokenURL)
    const paramsURL = {
      grant_type: "https://oauth.reddit.com/grants/installed_client",
      device_id: deviceId
    }
    fetchTokenURL.search = new URLSearchParams(paramsURL)
    const fetchConfig = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Base64.encode(`${data.clientId}:`)}`
      }
    }
    try {
      const rawResponse = await fetch(fetchTokenURL, fetchConfig)
      const { access_token: accessToken, ...rest } = await rawResponse.json()
      data.tokens.accessToken = accessToken
      console.log(rest)
      console.log(data.tokens)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  const refreshAuthTokens = async () => {
    switch (clientType) {
      case "app":
        return fetchAuthTokens()
      default:
        return {}
    }
  }

  return Object.freeze({
    fetchAuthTokens,
    getAuthTokens,
    isLoggedIn,
    refreshAuthTokens,
    setAuthTokens
  })
}

export * from "./subreddit"
