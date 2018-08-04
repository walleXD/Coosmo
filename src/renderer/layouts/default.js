import React from "react"
import Route from "react-router-dom/Route"
import { func, object } from "prop-types"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import IconButton from "@material-ui/core/IconButton"
import { goBack } from "connected-react-router"
import { connect } from "react-redux"
import { AppBar, Toolbar, withStyles } from "@material-ui/core"
import { compose } from "recompose"

const styles = theme => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column"
  }
})

const DefaultLayout = ({
  component: Component,
  goBack,
  computedMatch,
  classes,
  ...rest
}) => (
  <Route
    render={renderProps => (
      <div className={classes.root}>
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
  computedMatch: object,
  classes: object
}

export default compose(
  connect(
    null,
    { goBack }
  ),
  withStyles(styles)
)(DefaultLayout)
