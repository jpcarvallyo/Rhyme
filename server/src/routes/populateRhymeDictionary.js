const express = require("express");
const router = express.Router();
const path = require("path");
const { dictionary, rhymesWithDictionary } = require("../resources/index");
const getRhymes = require("../utils/getRhymes");

router.post("/", async (req, res) => {
  try {
    // let count = 0;
    // for (let key of Object.keys(dictionary)) {
    //   if (count === 1000) {
    //     // path.join(__dirname.slice(0, -7) + "/API-Documentation/index.html");
    //     await fs.writeFile(
    //       `${path.join(__dirname.slice(0, 7)+ "resources/")}rhymesWith.json`,
    //       JSON.stringify(rhymesWithDictionary),
    //       function (err) {
    //         if (err) return console.log(err);
    //         console.log("Wrote to file rhymesWith.json");
    //       }
    //     );
    //     return;
    //   } else if (rhymesWithDictionary[key] === undefined) {
    //     console.log(`Adding ${key} to dictionary`);
    //     rhymesWithDictionary[key] = {
    //       meaning: dictionary[key],
    //       rhymesWith: await getRhymes(key),
    //     };
    //   }

    //   count++;
    // }
    res.status(200).json({
      message: "hit the post",
    });
  } catch (error) {
    res.status(500).json({
      message: `Oh no, server is behaving poorly: ${error}`,
    });
  }
});

module.exports = router;
