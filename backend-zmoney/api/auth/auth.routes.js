const express = require('express')
const {onLogin} = require('./auth.controller')
const router = express.Router()

router.post('/', onLogin)

module.exports = router