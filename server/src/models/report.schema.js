import { Schema } from 'mongoose'

export const reportSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  location: { type: [Number] },
  created_at: { type: Date, default: Date.now }
})

// TODO: Validate this works as expected (speeds up range queries)
reportSchema.index({ created_at: 1, location: '2dsphere' })

reportSchema.statics.findWithinBounds = function(bounds, filters) {
  const queryFilters = {}

  if (filters) {
    const created_at = {}
    if (filters.startDate) {
      created_at.$gt = filters.startDate
    }
    if (filters.endDate) {
      created_at.$lt = filters.endDate
    }
    queryFilters.created_at = created_at
  }

  const query = this.find(queryFilters)
    .where('location')
    .box(bounds.lower, bounds.upper)
    .select('location user')
    .populate('user', 'gender')

  return query
}

reportSchema.set('toJSON', { getters: true, virtuals: true })
