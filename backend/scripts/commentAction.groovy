def comments = ctx._source.comments

if (!comments) {
  comments = []
}

for (comment in comments) {
  if (comment.commentId == commentId){
    comment[action] += count
  }
}
