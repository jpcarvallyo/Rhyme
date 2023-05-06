const path = require("path");
const express = require("express");
const router = express.Router();
// const getCurrentDagPrice = require("../utils/getDagPrice.js");

// const priceOfDagNode = (price) => {
//   const requiredDag = 250000;
//   return requiredDag / (1 / price);
// };

// router.get("/", async (req, res) => {
//   try {
//     const { price } = req.query;
//     if (price) {
//       res.json({ dagNode: `${priceOfDagNode(price)}` });
//     } else {
//       const currentPrice = await getCurrentDagPrice();
//       res.json({ dagNode: `${priceOfDagNode(currentPrice)}` });
//     }
//   } catch (error) {
//     res.status(404).json({
//       message: "Oh no, it looks like this word is not",
//     });
//   }
// });

// module.exports = router;

///

router.get("/", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname.slice(0, -17) + "public/pages/dag.html"));
  } catch (error) {
    res.status(404).json({
      message: `Page is missing, not found: ${error}`,
    });
  }
});

module.exports = router;
