import { reportSchema } from './report.schema'
import getClusters from '../lib/clusters'

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

  const findWithinBounds = (bounds, filters) =>
    Report.findWithinBounds(bounds, filters)

  const getSummary = async (bounds, radius, filters) => {
    // fetch elements, considering filters
    const reports = await findWithinBounds(bounds, filters)
    const genderStats = {}
    const reportsLocations = []

    // iterate reports
    for (const report of reports) {
      // build gender stats, build points
      if (!genderStats[report.user.gender]) {
        genderStats[report.user.gender] = 0
      }
      genderStats[report.user.gender]++
      reportsLocations.push(report.location)
    }

    return {
      genderStats,
      clusters: getClusters(reportsLocations, bounds)
    }
  }

  return { getReport, putReport, findWithinBounds, getSummary }
}
