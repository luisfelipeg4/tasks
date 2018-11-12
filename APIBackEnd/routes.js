const express = require('express')
const routes = express.Router()
const cors = require('cors')
routes.use('/tasks',require('./app/controllers/tasks'))
routes.use(express.json())
app.use(cors({ origin: '*' }))

module.exports=routes