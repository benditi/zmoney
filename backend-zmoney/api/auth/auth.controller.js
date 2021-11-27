const authService = require('../auth/auth.service')

async function onLogin(req, res){
    console.log('req.body', req.body);
    const {phoneNumber, password} = req.body;
    console.log('phoneNumber, password', phoneNumber, password);
    try {
        const user = await authService.login(phoneNumber, password)
        res.json(user);
    } catch (err) {
        res.status(500).send( {err: 'Failed to login'})
    }
}

module.exports = {
    onLogin
}