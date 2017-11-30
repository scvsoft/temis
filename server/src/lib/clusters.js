import kdbush from 'kdbush'
import geokdbush from 'geokdbush'

export const getClusters = (points, radius) => {
  const clusterPoints = []

  for (let i = 0; i < points.length; i++) {
    clusterPoints.push({
      id: i,
      point: points[i]
    })
  }

  const getLng = clusterPoint => clusterPoint.point[0]
  const getLat = clusterPoint => clusterPoint.point[1]

  const index = kdbush(clusterPoints, getLng, getLat)
  const processed = new Set()
  const clusters = []

  for (let i = 0; i < clusterPoints.length; i++) {
    if (processed.has(clusterPoints[i].id)) {
      continue
    }
    processed.add(clusterPoints[i].id)
    const nearest = geokdbush.around(
      index,
      clusterPoints[i].point[0],
      clusterPoints[i].point[1],
      Infinity,
      radius
    )
    const filtered = nearest.filter(
      clusterPoint => !processed.has(clusterPoint.id)
    )
    filtered.map(clusterPoint => processed.add(clusterPoint.id))
    clusters.push({
      point: clusterPoints[i].point,
      total: filtered.length + 1
    })
  }

  return clusters
}
