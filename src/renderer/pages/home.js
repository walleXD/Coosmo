import React from "react"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const HomePage = () => (
  <div id="home_page">
    <Typography variant="headline">Coosmo Home</Typography>
    <Button component={Link} to="/r/all">
      All
    </Button>
    <Button component={Link} to="/r/nyc">
      NYC Subreddit
    </Button>
  </div>
)

export default HomePage
