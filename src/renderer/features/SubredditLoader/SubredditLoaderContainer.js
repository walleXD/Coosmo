import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { string, func, object } from "prop-types"
import Button from "@material-ui/core/Button"

import { getPosts } from "./actions"

class SubredditloaderContainer extends PureComponent {
  static propTypes = {
    subreddit: string,
    getPosts: func,
    subreddits: object
  }

  componentDidMount() {
    const { subreddit, getPosts, subreddits } = this.props
    if (!subreddits[subreddit]) getPosts({ subreddit })
  }

  getMorePosts = () => {
    const { subreddit, getPosts, subreddits } = this.props
    const { after } = subreddits[subreddit]
    getPosts({ subreddit, after })
  }

  render() {
    return (
      <div>
        <h1>Loading subreddit</h1>
        <Button onClick={this.getMorePosts}>Load more</Button>
      </div>
    )
  }
}

export default connect(
  ({ knot: { subreddits } }) => ({ subreddits }),
  { getPosts }
)(SubredditloaderContainer)
