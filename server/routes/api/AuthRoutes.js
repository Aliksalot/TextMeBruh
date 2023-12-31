const express = require('express')
const router = express.Router()

const userController = require('../../controllers/UserController')

router.post('/loginattempt', userController.login)

router.post('/register', userController.newUser)

router.get('/logout', userController.logout)

module.exports = router;