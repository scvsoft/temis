import { expect } from 'chai'
import { getClusters } from '../../src/lib/clusters'

describe('Clusters', () => {
  describe('getClusters', () => {
    test('build clusters from points', () => {
      const points = [
        [-34.588491, -58.487736],
        [-34.586285, -58.488906],
        [-34.589159, -58.492805],
        [-34.578695, -58.502467],
        [-34.575395, -58.506206],
        [-34.575395, 58.506206]
      ]
      const clusters = getClusters(points, 1)
      const expectedClusters = [
        { point: [-34.588491, -58.487736], total: 3 },
        { point: [-34.578695, -58.502467], total: 2 },
        { point: [-34.575395, 58.506206], total: 1 }
      ]
      expect(clusters).to.deep.equal(expectedClusters)
    })
  })
})
