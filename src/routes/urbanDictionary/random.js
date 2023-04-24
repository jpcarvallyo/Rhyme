const express = require("express");
const router = express.Router();
const { urbanDictionary } = require("../../resources/index");

router.get("/random", (req, res) => {
  const urbanDictionaryWords = Object.keys(urbanDictionary);
  const randomInt = Math.floor(Math.random() * urbanDictionaryWords.length - 1);
  const randomWord = urbanDictionaryWords[randomInt];
  const meaning = urbanDictionary[randomWord]["meaning"];
  const example = urbanDictionary[randomWord]["example"];
  console.log(randomWord);
  res.json({
    word: randomWord,
    meaning,
    example,
  });
});

module.exports = router;
