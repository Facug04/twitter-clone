import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const postSchema = mongoose.Schema(
  {
    username: String,
    image: String,
    description: String,
    likes: Number,
    comments: Array,
  },
  { timestamps: true }
)

postSchema.plugin(mongoosePaginate)

const postModel = mongoose.model('Post', postSchema)

export default postModel
