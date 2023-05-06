const express = require("express");
const router = express.Router();
const getCurrentDagPrice = require("../utils/getDagPrice.js");

const priceOfDagNode = (price) => {
  const requiredDag = 250000;
  return requiredDag / (1 / price);
};

router.get("/", async (req, res) => {
  try {
    const { price } = req.query;
    if (price) {
      res.json({ dagNode: `${priceOfDagNode(price)}` });
    } else {
      const currentPrice = await getCurrentDagPrice();
      res.json({ dagNode: `${priceOfDagNode(currentPrice)}` });
    }
  } catch (error) {
    res.status(404).json({
      message: "Oh no, it looks like this word is not",
    });
  }
});

module.exports = router;
