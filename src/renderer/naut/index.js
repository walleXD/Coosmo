import { Base64 } from "js-base64"
import { URL, URLSearchParams } from "url"

export default clientId => {
  const auth = {
    clientId,
    tokens: {},
    loggedIn: false
  }

  // get stored data
  const getAuthTokens = () => auth.tokens

  const isLoggedIn = () => auth.loggedIn

  const setAuthTokens = tokens => {
    auth.tokens = tokens
  }

  // actions with auth info
  const fetchAuthTokens = async () => {
    const fetchTokenURL = new URL("https://www.reddit.com/api/v1/access_token")
    const paramsURL = {
      grant_type: "https://oauth.reddit.com/grants/installed_client",
      device_id: "6c934738-948e-11e8-9eb6-529269fb1459"
    }
    fetchTokenURL.search = new URLSearchParams(paramsURL)
    const fetchConfig = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Base64.encode(`${auth.clientId}:`)}`
      }
    }
    const rawResponse = await fetch(fetchTokenURL, fetchConfig)
    const { access_token: accessToken } = await rawResponse.json()
    // console.log(rest)
    auth.tokens.accessToken = accessToken
  }

  const refreshAuthTokens = async () => {}

  return Object.freeze({
    fetchAuthTokens,
    getAuthTokens,
    isLoggedIn,
    refreshAuthTokens,
    setAuthTokens
  })
}
