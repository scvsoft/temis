import getReportModel from '../models/report'
import getMongoose from '../models/mongoose'

export default () => {
  const { getReport, putReport, getSummary } = getReportModel(getMongoose())

  const get = async (req, res) => {
    try {
      const report = await getReport(req.params.reportId, req.query.expand)

      res.status(200).json(report)
    } catch (err) {
      res.status(404).end()
    }
  }

  const post = async (req, res) => {
    const reportProperties = {
      ...req.body,
      user: req.auth.id
    }
    try {
      const report = await putReport(reportProperties)
      res.status(200).json(report)
    } catch (err) {
      res.status(400).json(err)
    }
  }

  const summary = async (req, res) => {
    const bounds = req.query.bounds.split(',')
    const summary = await getSummary(
      {
        lower: [bounds[0], bounds[1]],
        upper: [bounds[2], bounds[3]]
      },
      req.query.radius
    )

    res.status(200).json(summary)
  }

  return { get, post, summary }
}
