const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    update,
    add
}

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('user')
        const users = await collection.find(criteria).toArray()
        return users
    } catch (err) {
        throw err
    }
}

function _buildCriteria(filterBy){
    if (filterBy.params){
         let value;
        if (filterBy.params ==='employee') {
            value = false;
        } else if (filterBy.params ==='employer'){
            value = true;
        
        } else {
            return {}
        }
        return {isEmployer: value}
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
    throw err;
    }
}

async function update(user) {
    try {
        user._id = ObjectId(user._id)
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: user._id }, { $set: user })
        return user; 
    } catch (err) {
        throw err
    }
}

async function add(user) {
    try {
        const collection = await dbService.getCollection('user')
        const addedUser = await collection.insertOne(user)
        return addedUser
    } catch (err) {
        throw err
    }
}