import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { string, func, object } from "prop-types"

import { getPosts } from "./actions"

class SubredditloaderContainer extends PureComponent {
  static propTypes = {
    subreddit: string,
    getPosts: func,
    subreddits: object
  }

  componentDidMount() {
    const { subreddit, getPosts } = this.props
    if (!this.props.subreddits[subreddit]) getPosts({ subreddit })
  }
  render() {
    return <h1>Loading subreddit</h1>
  }
}

export default connect(
  ({ knot: { subreddits } }) => ({ subreddits }),
  { getPosts }
)(SubredditloaderContainer)
