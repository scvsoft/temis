import { Schema } from 'mongoose'

export const reportSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    location: { type: [Number], index: '2dsphere' }
  },
  {
    timestamps: true
  }
)

reportSchema.set('toJSON', { getters: true, virtuals: true })
