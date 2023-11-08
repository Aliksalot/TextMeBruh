const { MongoClient } = require('mongodb')

const vals = require('./database_constants')

const client = new MongoClient(vals.dbUrl, { useUnifiedTopology: true });

const getCollection = (collectionName) => {
    try{
        return new Promise(async(resolve, reject) =>{

            await client.connect();

            const db = client.db(vals.dbName)

            const collection = db.collection(collectionName)

            resolve(collection)
    })
    }catch(e){
        console.log('Error when connecting to database: \n', e)
        return null
    }
}

module.exports = getCollection()