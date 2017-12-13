import moment from 'moment'
import mongoose from 'mongoose'
import { reportSchema } from './report.schema'
import { getClusters } from '../lib/clusters'

// TODO: Abstract this, it's similar to the User model

const Report = mongoose.model('Report', reportSchema)

export const getReport = (id, expand) => {
  const query = Report.findById(id)

  if (expand) {
    return query.populate(expand)
  } else {
    return query
  }
}

export const putReport = async (reportProperties, id) => {
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

export const findWithinBounds = (bounds, filters) =>
  Report.findWithinBounds(bounds, filters)

export const getFrequencyStats = (total, minDate, maxDate) => {
  const units = ['hours', 'days', 'weeks', 'months', 'years']
  let frequency
  let unit

  for (let i = 0; i < units.length; i++) {
    const diff = moment(maxDate).diff(minDate, units[i])
    if (diff < 1) {
      break
    }
    frequency = total / diff
    unit = units[i]
  }

  return {
    frequency,
    unit
  }
}

export const getSummary = async (bounds, radius, filters) => {
  // fetch elements, considering filters
  const reports = await findWithinBounds(bounds, filters)
  const genderStats = {}
  const reportsLocations = []
  let total = 0
  let minDate = reports[0].created_at
  let maxDate = reports[0].created_at

  // iterate reports
  for (const report of reports) {
    // build gender stats, build points
    if (!genderStats[report.user.gender]) {
      genderStats[report.user.gender] = 0
    }
    genderStats[report.user.gender]++
    reportsLocations.push(report.location)
    total++
    if (moment(minDate).isAfter(report.created_at)) {
      minDate = report.created_at
    }
    if (moment(maxDate).isBefore(report.created_at)) {
      maxDate = report.created_at
    }
  }

  return {
    genderStats,
    frequencyStats: getFrequencyStats(total, minDate, maxDate),
    clusters: getClusters(reportsLocations, radius)
  }
}
