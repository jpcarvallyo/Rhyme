const express = require("express");
const router = express.Router();
const {
  dictionary,
  rhymesWithDictionary,
  wordList,
} = require("../resources/index.js");
const getRhymes = require("../utils/getRhymes.js");

router.get("/", async (req, res) => {
  const randomInt = Math.floor(Math.random() * wordList.length - 1);
  const randomWord = wordList[randomInt];
  const msg = rhymesWithDictionary[randomWord] === undefined ? true : false;

  if (rhymesWithDictionary[randomWord] === undefined) {
    rhymesWithDictionary[randomWord] = {
      meaning: dictionary[randomWord],
      rhymesWith: await getRhymes(randomWord),
    };
  }

  res.json({
    addedToDB: rhymesWithDictionary[randomWord] === undefined ? false : true,
    word: randomWord,
    meaning: dictionary[randomWord],
    rhymesWith: rhymesWithDictionary[randomWord].rhymesWith,
  });
});

module.exports = router;
