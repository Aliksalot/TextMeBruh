const express = require('express')
const router = express.Router()

const authRouter = require('./api/AuthRoutes')

const authMiddleware = require('../middleware/UserAuth')

router.use(authMiddleware)

router.use('/auth', authRouter)

module.exports = router;