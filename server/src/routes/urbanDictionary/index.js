const express = require("express");
const router = express.Router();
const { urbanDictionary } = require("../../resources/index");

router.get("/", async (req, res) => {
  try {
    res.json({
      urbanDictionary,
    });
  } catch (error) {
    res.status(500).json({
      message: "Oh no, server is behaving poorly",
    });
  }
});

module.exports = router;
