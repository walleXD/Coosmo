import React from "react"
import Route from "react-router-dom/Route"
import { func, object } from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import IconButton from "@material-ui/core/IconButton"
import { goBack } from "connected-react-router"
import { connect } from "react-redux"

const DefaultLayout = ({
  component: Component,
  goBack,
  computedMatch,
  ...rest
}) => (
  <Route
    render={renderProps => (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton color="inherit" aria-label="Menu" onClick={goBack}>
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Component {...renderProps} match={computedMatch} />
      </div>
    )}
  />
)

DefaultLayout.propTypes = {
  component: func,
  goBack: func,
  computedMatch: object
}

export default connect(
  null,
  { goBack }
)(DefaultLayout)
