const express = require("express");
const router = express.Router();
const { urbanDictionary } = require("../../resources/index");

router.get("/random", (req, res) => {
  try {
    const urbanDictionaryWords = Object.keys(urbanDictionary);
    const randomInt = Math.floor(
      Math.random() * urbanDictionaryWords.length - 1
    );
    const randomWord = urbanDictionaryWords[randomInt];
    const meaning = urbanDictionary[randomWord]["meaning"];
    const example = urbanDictionary[randomWord]["example"];
    res.json({
      word: randomWord,
      meaning,
      example,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong on our end ${error}`,
    });
  }
});

module.exports = router;
