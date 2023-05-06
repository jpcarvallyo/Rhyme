const express = require("express");
const router = express.Router();

const priceOfDagNode = (price) => {
  const requiredDag = 250000;
  return requiredDag / (1 / price);
};

router.get("/:price", async (req, res) => {
  try {
    const priceOfDag = req.params.price;
    res.json({ dagNode: `${priceOfDagNode(priceOfDag)}` });
  } catch (error) {
    res.status(404).json({
      message: "Oh no, it looks like this word is not",
    });
  }
});

module.exports = router;
