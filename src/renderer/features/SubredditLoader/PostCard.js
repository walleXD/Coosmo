import React from "React"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { string } from "prop-types"

const PostCard = ({ title }) => (
  <Card>
    <CardContent>
      <Typography>{title}</Typography>
    </CardContent>
  </Card>
)

PostCard.propTypes = {
  title: string
}

export default PostCard
