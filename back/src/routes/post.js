import express from 'express'
import { v4 as uuidv4 } from 'uuid'

import postModel from '../schemas/post-schema.js'

const postRouter = express.Router()

postRouter.get('/', (req, res) => {
  const { page, order, filter } = req.query

  postModel
    .paginate({}, { page: page, limit: 10, sort: { [filter]: order } })
    .then((response) => res.json(response))
    .catch((err) => res.status(404).json({ error: err }))
})

postRouter.get('/:id', (req, res) => {
  const { id } = req.params

  postModel
    .findById(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(404).json({ error: err }))
})

postRouter.post('/', (req, res) => {
  const { post } = req.body
  console.log(post)
  if (!post?.username) return res.status(404).send()

  const newPost = new postModel({ ...post, likes: [], comments: [] })

  newPost.save().then((savePost) => res.json(savePost))
})

postRouter.post('/like', async (req, res) => {
  const { id, idUser } = req.body

  if (!id) return res.status(404).send()

  const { likes } = await postModel.findById(id)

  if (likes.some((userLike) => userLike === idUser)) {
    const removeLike = likes.filter((like) => like !== idUser)

    postModel
      .findOneAndUpdate({ _id: id }, { likes: removeLike })
      .then((response) => res.json(response))
      .catch((err) => res.status(404).json({ error: err }))
  } else {
    postModel
      .findOneAndUpdate({ _id: id }, { likes: [...likes, idUser] })
      .then((response) => res.json(response))
      .catch((err) => res.status(404).json({ error: err }))
  }
})

postRouter.post('/comment', async (req, res) => {
  const { id, username, comment, userImage } = req.body

  if (!id) return res.status(404).send()

  const { comments } = await postModel.findById(id)

  const idComment = uuidv4()

  const createdAt = new Date()

  postModel
    .findOneAndUpdate(
      { _id: id },
      {
        comments: [
          ...comments,
          { idComment, username, comment, image: userImage, createdAt },
        ],
      }
    )
    .then((response) => res.json(response))
    .catch((err) => res.status(404).json({ error: err }))
})

postRouter.post('/delete', async (req, res) => {
  const { id, idComment } = req.body

  if (!id || !idComment) return res.status(404).send()

  const { comments } = await postModel.findById(id)

  const deleteComment = comments.filter(
    (comment) => comment.idComment !== idComment
  )

  postModel
    .findOneAndUpdate({ id: idComment }, { comments: deleteComment })
    .then((response) => res.json(response))
    .catch((err) => res.status(404).json({ error: err }))
})

// postRouter.post('/xd', async (req, res) => {
//   const doc = await postModel.findById('63a1f70d189536dc77c4ff1d')
//   doc.likes = 4
//   await doc.save()
//   console.log(doc)
//   res.json(doc)
// })

export default postRouter
