const { getCollection } = require('../config/database_connect')
const { userCollectionName } = require('../config/database_constants')

class User{
    
    constructor(username, password){

        if(password === undefined){
            //means this request user from database
            getCollection(userCollectionName).then(async collection => {
                this = await collection.findOne({username: username})
            })
            return
        }

        //means create new user using username
        // and password from args
        getCollection(userCollectionName).then(async collection => {
            //hash password, etc
        })
        
    }

    changeUsername(newUsername){
        this.sync()
    }

    getUsername(){
        this.sync()
    }

    getHashedPassword(){
        this.sync()
    }

    changePassword(oldPass, newPass){
        this.sync()
    }

    async sync(){
        const collection = await getCollection(userCollectionName)

        collection.replaceOne({_id: this._id}, this)
    }
    

}

module.exports = User