const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

const session = require('express-session')
app.use(session({
    secret: "IAmSecret",
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '../client/public')))

const viewRoutes = require('./routes/view.js')
const apiRoutes = require('./routes/api.js')

app.use('/api', apiRoutes)
app.use('/', viewRoutes)

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/views/noSuchPage.html'))
})

const port = 3000;
//const ip = 

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})