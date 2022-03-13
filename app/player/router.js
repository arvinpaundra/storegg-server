const router = require('express').Router();
const {
  landingPage,
  detailPage,
  category,
  checkout,
  history,
  detailHistory,
  dashboard,
  profile,
  editProfile,
} = require('./controller');
const { isPlayerLoggedIn } = require('../../middleware/auth');
const multer = require('multer');
const os = require('os');

router.get('/landingpage', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isPlayerLoggedIn, checkout);
router.get('/history', isPlayerLoggedIn, history);
router.get('/history/:id/detail', isPlayerLoggedIn, detailHistory);
router.get('/dashboard', isPlayerLoggedIn, dashboard);
router.get('/profile', isPlayerLoggedIn, profile);
router.put(
  '/profile',
  isPlayerLoggedIn,
  multer({ dest: os.tmpdir() }).single('avatar'),
  editProfile
);

module.exports = router;
