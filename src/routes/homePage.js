const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log(path);
    const from = __dirname;
    const to = "API-Documentation/index.html";
    console.log(from);
    const relativePath = path.relative(from, to);
    console.log(relativePath);
    // console.log(path.join(__dirname + "/API-Documentation/index.html"));
    // res.sendFile(relativePath);
    res.sendFile(
      path.join(__dirname.slice(0, -7) + "/API-Documentation/index.html")
    );
  } catch (error) {
    console.log(path);
    const from = __dirname;
    const to = "API-Documentation/index.html";
    console.log(from);
    const relativePath = path.relative(from, to);
    console.log(relativePath);
    res.status(404).json({
      message: "Page is missing, not found",
    });
  }
});

module.exports = router;
