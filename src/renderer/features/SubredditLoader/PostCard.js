import React from "React"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { string, number, object } from "prop-types"

const PostCard = ({ title, score, author, id, style, ...rest }) => (
  <Card style={style}>
    <CardContent>
      <Typography>{title}</Typography>
    </CardContent>
  </Card>
)

PostCard.propTypes = {
  title: string,
  score: number,
  author: string,
  id: string,
  style: object
}

export default PostCard
