import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  _id: Number,
  email: { type: String, required: true },
  firstName: String,
  lastName: String
}, {
  timestamps: true
})

export default model('User', UserSchema)
