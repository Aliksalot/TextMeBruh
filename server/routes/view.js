const express = require('express');
const router = express.Router()
const path = require('path')

const viewsPath = path.join(__dirname, '../../client/src/views')

const authMiddleware = require('../middleware/UserAuth')

router.use(authMiddleware)

router.get('/login', (req, res) => {
    res.sendFile(path.join(viewsPath, 'login-page.html'))
})

router.get('/register', (req, res) => {
    res.sendFile(path.join(viewsPath, 'register-page.html'))    
})

router.get('/home', (req, res) => {
    res.sendFile(path.join(viewsPath, 'index.html'))
})


module.exports = router;