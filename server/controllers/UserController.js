const User = require('../models/User')
const passHandler = require('../utils/passHandler')

const getCollection = require('../config/database_connect')
const { userCollectionName } = require('../config/database_constants')

const sessionHandler = require('../utils/userSession')

const newAccountStatus = {
    taken: "TAKEN",
    success: "OK",
    other: "OTHER"
}

const newUser = async(req, res) => {

    const username = req.body.username
    const password = req.body.password
    const password_repeat = req.body.password_repeat

    console.log('register attempt', username, password, password_repeat)
    console.log(req.body)

    if(username === undefined || password === undefined || password_repeat === undefined){
        res.send(JSON.stringify({status: newAccountStatus.other}))
        return
    }
        

    const passwordState = passHandler.passwordState(password, password_repeat)

    if(passwordState !== passHandler.passwordStatus.ok){
        console.log('password issue when registering: ', passwordState)
        res.send(JSON.stringify({status: passwordState}))
        return
    }

    const collection = await getCollection(userCollectionName)
    const user = await collection.findOne({username: username})
    const isUserAvailable = (user) === null

    if(!isUserAvailable){
        console.log('username taken - sending status taken')
        res.send(JSON.stringify({status: newAccountStatus.taken}))
        return
    }

    try{
        const user = new User(username, password)
        console.log("new user success - sending status ok")

        sessionHandler.setLoggedIn(req, username)

        res.send(JSON.stringify({status: newAccountStatus.success}))
        return
    }catch(e){
        console.log('error when creating new user, probably username taken', e)
        res.send({status: newAccountStatus.taken})
        return
    }
}

const login = async(req, res) => {
    
    try{

        const username= req.body.username
        const password = req.body.password
        

        if(username === undefined || password === undefined){
            res.send({success: false})
            return
        }

        console.log('Login request for ', username)

        const user = new User(username)
        const hashedPassword = await user.getHashedPassword()
        console.log(user, password, hashedPassword)

        const passwordsMatch = await passHandler.comparePasswords(password, hashedPassword);
        if(passwordsMatch){
            console.log('Login success for ', username)
            sessionHandler.setLoggedIn(req, username)
            res.send({success: true})
        }else{
            console.log('Login fail for ', username)
            res.send({success: false})
        }

    }catch(e){
        console.log('Error when loggin in:' , e)
        res.send({success: false})
    }

}

const logout = (req, res) => {
    sessionHandler.logout()
    res.redirect('/home');
}

module.exports = {
    newUser,
    login,
    logout,
}