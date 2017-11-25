import { reportSchema } from './report.schema'

// TODO: Abstract this, it's similar to the User model
export default mongoose => {
  const Report = mongoose.model('Report', reportSchema)

  const getReport = (id, expand) => {
    const query = Report.findById(id)

    if (expand) {
      return query.populate(expand)
    } else {
      return query
    }
  }

  const putReport = async (reportProperties, id) => {
    let report

    try {
      if (id) {
        report = await getReport(id)
        report.set(reportProperties)
      } else {
        report = new Report(reportProperties)
      }
    } catch (err) {
      return err
    }

    return report.save()
  }

  return { getReport, putReport }
}
