import React, { PureComponent } from "react"
import { hot } from "react-hot-loader"
import { compose } from "recompose"
import { connect } from "react-redux"
import { func, object } from "prop-types"
import { ConnectedRouter as Router } from "connected-react-router"

import Pages from "../pages"
import withMaterialRoot from "../utils/withMaterialRoot"
import { initClient } from "../actions"

class App extends PureComponent {
  static propTypes = {
    initClient: func,
    history: object
  }

  componentDidMount() {
    this.props.initClient()
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Pages />
      </Router>
    )
  }
}

export default compose(
  hot(module),
  connect(
    null,
    { initClient }
  ),
  withMaterialRoot
)(App)
