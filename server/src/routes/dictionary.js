const express = require("express");
const router = express.Router();
const { dictionary } = require("../resources/index.js");

router.get("/", (req, res) => {
  try {
    res.json({
      dictionary,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong on server: ${error}`,
    });
  }
});

module.exports = router;
