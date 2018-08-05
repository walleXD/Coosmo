import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { string, func, object } from "prop-types"
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader
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

  _isRowLoaded = ({ index: i }) => {
    const { subreddits, subreddit } = this.props
    const posts = subreddits[subreddit].posts
    return !!posts[i]
  }

  _loadMoreRows = ({ startIndex, stopIndex }) =>
    new Promise((resolve, reject) => {
      this._getMorePosts()
      if (!this.props.subreddits.loadingPosts) resolve()
    })

  _renderRows = ({ index, isScrolling, parent, key, style, ...rest }) => {
    const { subreddit, subreddits } = this.props
    const { posts } = subreddits[subreddit]
    return (
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
    )
  }

  _renderPosts() {
    const { subreddit, subreddits } = this.props
    const { posts } = subreddits[subreddit]
    return (
      <InfiniteLoader
        isRowLoaded={this._isRowLoaded}
        loadMoreRows={this._loadMoreRows}
        rowCount={30000}
        threshold={15}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                scrollToAlignment="start"
                width={width}
                height={height}
                rowCount={posts.length}
                deferredMeasurementCache={this.cache}
                rowHeight={this.cache.rowHeight}
                overscanRowCount={5}
                rowRenderer={this._renderRows}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
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
