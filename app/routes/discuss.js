'use strict'

const { Router } = require('express')

const { discussget, shareget, sharepost } = require('../controllers/discuss')
const { requireAuth } = require('../middlewares/auth')

const discussRouter = Router()

discussRouter
  .get('/discuss', requireAuth, discussget)

  .get('/share', requireAuth, shareget)
// .post('/share', sharepost)

module.exports = discussRouter
