const { isLoginAdmin } = require('../../middleware/auth');
const { index, actionStatus } = require('./controller');

const router = require('express').Router();

router.use(isLoginAdmin);
router.get('/', index);
router.put('/status/:id', actionStatus);

module.exports = router;
