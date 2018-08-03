export const initClient = () => async (_, __, { coosmonaut }) =>
  coosmonaut.fetchAuthTokens()
