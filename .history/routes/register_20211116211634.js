const express = require("express");
const router = express.Router();
const valid = require('../middleware/valid');
const { registerSchema } = require('../schema/register');

router.post("/", valid(registerShema), (req, res) => {
  res.send(req.body);
});

module.exports = router;
