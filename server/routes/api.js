const express = require('express')
const router = express.Router()

const userDataRouter = require('./api/UserRoutes') 

router.use('/auth', userDataRouter)

module.exports = router;