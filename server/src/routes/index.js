const express = require("express");
const router = express.Router();

// Import routes
const dictionaryRouter = require("./dictionary");
const homePageRouter = require("./homePage");
const mlbRouter = require("./mlb");
const wordRouter = require("./word");
const randomWordRouter = require("./randomWord");
const urbanDictionaryRouter = require("./urbanDictionary/index.js");
const urbanDictionaryRandomRouter = require("./urbanDictionary/random.js");
const populateRhymeDictionaryRouter = require("./populateRhymeDictionary");

// bind url routes with the routers
router.use("/", homePageRouter);
router.use("/word", wordRouter);
router.use("/mlb", mlbRouter);
router.use("/randomWord", randomWordRouter);
router.use("/dictionary", dictionaryRouter);
router.use("/urbanDictionary", urbanDictionaryRouter);
router.use("/urbanDictionary", urbanDictionaryRandomRouter);
router.use("/populateRhymeDictionary", populateRhymeDictionaryRouter);

module.exports = router;
