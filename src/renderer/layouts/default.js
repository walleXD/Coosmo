import React from "react"
import Route from "react-router-dom/Route"
import { node } from "prop-types"

const DefaultLayout = ({ component: Component }) => (
  <Route render={renderProps => <Component {...renderProps} />} />
)

DefaultLayout.propTypes = {
  component: node
}

export default DefaultLayout
