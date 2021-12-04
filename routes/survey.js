const express = require('express');
const router = express.Router();

const surveyHandle = require('../routesHandle/survey');

router.post('/', surveyHandle);

module.exports = router;