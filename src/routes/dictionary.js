const express = require("express");
const router = express.Router();
const { dictionary } = require("../resources/index.js");

router.get("/", (req, res) => {
  // Handle GET request for the root path
  console.log("dictionary success");
  res.json({
    dictionary,
  });
});

module.exports = router;
