import React from "react"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"

const HomePage = () => (
  <div id="home_page">
    <Typography variant="headline">This is the coosmo home page</Typography>
    <Link to="/r/nyc">Subreddit Page</Link>
    <Link to="/r/nyc/comments/k2j1n3jn123">Post Page</Link>
    <Link to="/test">Test</Link>
  </div>
)

export default HomePage
