import { reportSchema } from './report.schema'

export default mongoose => {
  const Report = mongoose.model('Report', reportSchema)

  const getReport = (id, expand) => {
    let query
    try {
      query = Report.findById(id)
    } catch (err) {
      return null
    }

    if (expand) {
      return query.populate(expand)
    } else {
      return query
    }
  }

  const putReport = (reportProperties, id) => {
    return Report.findByIdAndUpdate(
      id || mongoose.Types.ObjectId(),
      reportProperties,
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    )
  }

  return { getReport, putReport }
}
