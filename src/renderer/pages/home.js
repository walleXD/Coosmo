import React from "react"
import { Link } from "react-router-dom"

const HomePage = () => (
  <div>
    <h1>This is the coosmo home page</h1>
    <Link to="/r/nyc">Subreddit Page</Link>
    <Link to="/r/nyc/comments/k2j1n3jn123">Post Page</Link>
    <Link to="/test">Test</Link>
  </div>
)

export default HomePage
