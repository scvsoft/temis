import { reportSchema } from './report.schema'

export default mongoose => {
  const Report = mongoose.model('Report', reportSchema)

  const getReport = id => {
    return Report.findById(id).populate('user')
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
    ).populate('user')
  }

  return { getReport, putReport }
}
