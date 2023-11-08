const express = require('express')
const router = express.Router()

router.use(express.json())

router.post('/loginattempt', (req, res) => {
    if(req.body.logged){
        res.send({status: true})
    }
    res.send({status: "hello"})
})




module.exports = router;