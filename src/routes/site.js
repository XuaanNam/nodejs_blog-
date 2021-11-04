const express = require('express');
const siteController = require('../app/controllers/SiteController');
const router = express.Router();

router.use('/:slug', siteController.search);
router.use('/', siteController.index);

module.exports = router;