const express = require('express');
const router = express.Router();

const getTopHandle = require('../routesHandle/getTop');

router.get('/', getTopHandle);

module.exports = router;