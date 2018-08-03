import React, { Fragment } from "react"
import Typography from "@material-ui/core/Typography"
import { object } from "prop-types"

import SubredditLoader from "../features/SubredditLoader/SubredditLoaderContainer"

const SubredditPage = ({ match }) => (
  <Fragment>
    <Typography variant="headline">This is a subreddit</Typography>
    {console.log(match.params.subreddit)}
    <SubredditLoader subreddit={match.params.subreddit} />
  </Fragment>
)

SubredditPage.propTypes = {
  match: object
}

export default SubredditPage
