import express from 'express'
import { get, post, summary } from '../controllers/reports'

const router = express.Router()

router.get('/summary', summary)
router.get('/:reportId', get)
router.post('/', post)

export default router
