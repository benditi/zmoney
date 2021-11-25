const userService = require('./user.service')

async function getUser(req, res){
    try {
        const user = await userService.getById(req.params.id)
        res.send(user) 
    } catch (err) {
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function getUsers(req, res){
    console.log('inside getUsers');
    try {
        var queryParams = req.query;
        console.log('queryParams', queryParams);
        const users = await userService.query(queryParams) 
        res.send(users)
    } catch(err) {
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function updateUser(req, res){
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err){
        res.status(500).send({ err: 'Failed to update user' }) 
    }
}

async function addUser(req, res){
    try {
        const user = req.body;
        const addedUser = await userService.add(user)
        res.json(addedUser)
      } catch (err) {
        res.status(500).send({ err: 'Failed to add user' })
      }
}

// async function getCount(req, res){
//     try {
//         console.log('inside counter');
//         console.log('req.params.isCountOn', req.params.isCountOn);
//         const dateNow = req.params.dateNow //do destructure
//         const count = await userService.loadCount(dateNow)
//         res.send(count);
//     } catch (err){
//         res.status(500).send({err: 'Falied to get count'})
//     }
// }


module.exports = {
    getUser,
    getUsers,
    updateUser,
    addUser,
}