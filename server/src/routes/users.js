import express from 'express'
import { get, put } from '../controllers/users'

const router = express.Router()

router.get('/:userId', get)
router.put('/:userId', put)

export default router
