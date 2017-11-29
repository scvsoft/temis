import { Schema } from 'mongoose'

export const genders = ['other', 'female', 'male']

export const userSchema = new Schema({
  name: { type: String },
  gender: { type: String, enum: genders },
  birthday: { type: Date },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  anonymous: { type: Boolean },
  facebookProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
})

userSchema.set('toJSON', { getters: true, virtuals: true })
