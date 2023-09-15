const express = require("express");
const router = express.Router();

const { default: axios } = require("axios");

router.get("/", async (req, res) => {
  try {
    const data = await axios
      .get("http://localhost:9001")
      .then((resp) => resp.json());
    console.log(data);
    // res.json(data);
    res.json({ message: "hi" });
    // res.json({
    //   addedToDB: rhymesWithDictionary[randomWord] === undefined ? false : true,
    //   word: randomWord,
    //   meaning: dictionary[randomWord],
    //   rhymesWith: rhymesWithDictionary[randomWord].rhymesWith,
    // });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong on our server: ${error}`,
    });
  }
});

module.exports = router;
