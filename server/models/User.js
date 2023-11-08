const getCollection = require('../config/database_connect')
const { userCollectionName } = require('../config/database_constants')
const passwordHandler = require('../utils/passHandler')

class User{
    
    constructor(username, password){

        this.username = username
        if(password === undefined)
            return
        //means create new user using username
        // and password from args
        getCollection(userCollectionName).then(async collection => {
            //hash password, etc
            const user = await collection.findOne({username: username})
            const isUserAvailable = (user) === null
            
            if(!isUserAvailable){
                return 
            }
                

            passwordHandler.encryptPassword(password, async(err, hashedPassword) => {     
                console.log('creating new user', username)
                const user = {username: username, password: hashedPassword}                    
                collection.insertOne(user)
                return
                 
            })
        })
        
    }

    async getUser(){
        const collection = await getCollection(userCollectionName)
        const user = await collection.findOne({username: this.username})
        return user
    }

    changeUsername(newUsername){
        this.sync()
    }

    getUsername(){
        
    }

    async getHashedPassword(){
        
        const user = await this.getUser()

        return user.password
    }

    changePassword(oldPass, newPass){
        this.sync()
    }

    async sync(){
        const collection = await getCollection(userCollectionName)

        collection.replaceOne({username: this.username}, this)
    }
    

}

module.exports = User