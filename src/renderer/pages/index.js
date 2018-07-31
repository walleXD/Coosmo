import React from "react"
import { Route, Switch } from "react-router-dom"

import NotFoundPage from "./notFound"
import HomePage from "./home"

const Pages = () => (
  <Switch>
    <Route path="/" component={HomePage} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default Pages
