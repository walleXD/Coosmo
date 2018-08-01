import React from "react"
import { Route, Switch } from "react-router-dom"

import HomePage from "./home"
import SubredditPage from "./subreddit"
import PostPage from "./post"
import TestPage from "./test"
import NotFoundPage from "./notFound"

const Pages = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/test" component={TestPage} />
    <Route path="/r/:subreddit" component={SubredditPage} exact />
    <Route path="/r/:subreddit/comments/:id" component={PostPage} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default Pages
