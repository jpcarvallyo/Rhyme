const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.sendFile(
      path.join(__dirname.slice(0, -7) + "/API-Documentation/index.html")
    );
  } catch (error) {
    res.status(404).json({
      message: `Page is missing, not found: ${error}`,
    });
  }
});

module.exports = router;
