import React from "react"
import { Switch } from "react-router-dom"

import HomePage from "./home"
import SubredditPage from "./subreddit"
import PostPage from "./post"
import TestPage from "./test"
import NotFoundPage from "./notFound"

import DefaultRoute from "../layouts/default"

const Pages = () => (
  <Switch>
    <DefaultRoute path="/" component={HomePage} exact />
    <DefaultRoute path="/test" component={TestPage} />
    <DefaultRoute path="/r/:subreddit" component={SubredditPage} exact />
    <DefaultRoute path="/r/:subreddit/comments/:id" component={PostPage} />
    <DefaultRoute component={NotFoundPage} />
  </Switch>
)

export default Pages
