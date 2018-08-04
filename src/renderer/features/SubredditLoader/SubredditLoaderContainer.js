import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { string, func, object } from "prop-types"
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized"
import { compose } from "recompose"
import { withStyles, Button } from "@material-ui/core"
import { getPosts, setLoadingState } from "./actions"
import PostCard from "./PostCard"

const styles = () => ({
  root: {
    height: "80%"
  }
})

class SubredditloaderContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    })
  }
  static propTypes = {
    subreddit: string,
    getPosts: func,
    subreddits: object,
    classes: object
  }

  componentDidMount() {
    const { subreddit, getPosts, subreddits } = this.props
    if (!subreddits[subreddit]) getPosts({ subreddit })
  }

  _getMorePosts = () => {
    const { subreddit, getPosts, subreddits } = this.props
    const { after } = subreddits[subreddit]
    getPosts({ subreddit, after })
  }

  _renderPosts() {
    const { subreddit, subreddits } = this.props
    const { posts } = subreddits[subreddit]
    return (
      <AutoSizer>
        {({ width, height }) => (
          <List
            scrollToAlignment="start"
            width={width}
            height={height}
            rowCount={posts.length}
            deferredMeasurementCache={this.cache}
            rowHeight={this.cache.rowHeight}
            overscanRowCount={20}
            rowRenderer={({ index, isScrolling, parent, key, style }) => (
              <CellMeasurer
                className="Row"
                key={key}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
              >
                <PostCard {...posts[index].data} style={style} />
              </CellMeasurer>
            )}
          />
        )}
      </AutoSizer>
    )
  }

  render() {
    const { subreddits, subreddit: subredditTitle, classes } = this.props
    return (
      <div className={classes.root}>
        <Button onClick={this._getMorePosts}>Load more</Button>
        {!subreddits[subredditTitle] ? <h1>Loading</h1> : this._renderPosts()}
      </div>
    )
  }
}

export default compose(
  connect(
    ({ knot: { subreddits } }) => ({ subreddits }),
    { getPosts, setLoadingState }
  ),
  withStyles(styles)
)(SubredditloaderContainer)
