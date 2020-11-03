const { Router } = require('express');

const {
  discussget,
  shareget, sharepost
} = require('../controllers/discuss');
const { requireAuth } = require('../middlewares/auth');

const discussRouter = Router();

discussRouter.get('/discuss', requireAuth, discussget);

discussRouter.get('/share', requireAuth, shareget);
// discussRouter.post('/share', sharepost);

module.exports = discussRouter;
