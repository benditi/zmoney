const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

async function login(phoneNumber, password) {
    logger.debug(`auth.service - login with phone number: ${phoneNumber}`)

    const user = await userService.getByPhoneNumber(phoneNumber);
    if (!user) return Promise.reject('Invalid phone number or password')
    if (user.password!==password) return Promise.reject('password doesn\'t match phone number')
    delete user.password
    return user
}

module.exports = {
    login,
}