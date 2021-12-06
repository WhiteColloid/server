const express = require('express');
const router = express.Router();

const createClassHandle = require('../routesHandle/createClass');

router.post('/', createClassHandle);

module.exports = router;