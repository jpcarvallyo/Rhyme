const express = require("express");
const router = express.Router();
const { dictionary } = require("../resources/index");
const getRhymes = require("../utils/getRhymes");

router.get("/:word", async (req, res) => {
  try {
    const desiredWord = req.params.word;

    if (desiredWord && !dictionary[desiredWord]) {
      dictionary[desiredWord] = {
        word: desiredWord,
        meaning: dictionary[desiredWord],
        rhymesWith: await getRhymes(desiredWord),
      };
    }

    if (
      dictionary[desiredWord] &&
      dictionary[desiredWord].rhymesWith === undefined &&
      dictionary[desiredWord].meaning === undefined
    ) {
      dictionary[desiredWord] = {
        word: desiredWord,
        meaning: dictionary[desiredWord],
        rhymesWith: await getRhymes(desiredWord),
      };
      res.json(dictionary[desiredWord]);
    } else if (dictionary[desiredWord].rhymesWith) {
      res.json(dictionary[desiredWord]);
    }
  } catch (error) {
    res.status(404).json({
      message: "Oh no, it looks like this word is not",
    });
  }
});

module.exports = router;
