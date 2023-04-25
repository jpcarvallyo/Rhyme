const fs = require("fs");

const dictionary = JSON.parse(
  fs.readFileSync("server/src/resources/dictionary.json", "utf8")
);

const rhymesWithDictionary = JSON.parse(
  fs.readFileSync("server/src/resources/rhymesWith.json", "utf8")
);

const urbanDictionary = JSON.parse(
  fs.readFileSync("server/src/resources/urbanDictionaryA5.json", "utf-8")
);

const wordList = Object.keys(dictionary);

module.exports = {
  dictionary,
  rhymesWithDictionary,
  urbanDictionary,
  wordList,
};
