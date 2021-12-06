const express = require('express');
const router = express.Router();

const classHandle = require('../routesHandle/class');

router.get('/', classHandle);

module.exports = router;