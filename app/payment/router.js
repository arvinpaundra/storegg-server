const router = require('express').Router();
const { isLoginAdmin } = require('../../middleware/auth');
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete, actionStatus } = require('./controller');

router.use(isLoginAdmin);
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);
router.put('/status/:id', actionStatus);

module.exports = router;
