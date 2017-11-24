import { Schema } from 'mongoose'

export const userSchema = new Schema({
  name: { type: String },
  gender: { type: String },
  birthday: { type: Date },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  facebookProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
})

userSchema.set('toJSON', { getters: true })
