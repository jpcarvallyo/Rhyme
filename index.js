const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const url = require("url");
const morgan = require("morgan");
const port = 8000;
const rp = require("request-promise");
const cheerio = require("cheerio");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Body parser
app.use(
  express.urlencoded({
    extended: false,
  })
);

const dictionary = JSON.parse(
  fs.readFileSync("./resources/dictionary.json", "utf8")
);

const rhymesWithDictionary = JSON.parse(
  fs.readFileSync("./resources/rhymesWith.json", "utf8")
);

const urbanDictionary = JSON.parse(
  fs.readFileSync("./resources/urbanDictionaryA5.json", "utf-8")
);
const wordList = Object.keys(dictionary);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

// Create a dicitonary route

app.get("/fullDictionary", (req, res) => {
  console.log("fullDictionary success");
  res.json({
    dictionary,
  });
});

app.get("/randomWord", async (req, res) => {
  const randomInt = Math.floor(Math.random() * wordList.length - 1);
  const randomWord = wordList[randomInt];
  const msg = rhymesWithDictionary[randomWord] === undefined ? true : false;

  if (rhymesWithDictionary[randomWord] === undefined) {
    rhymesWithDictionary[randomWord] = {
      meaning: dictionary[randomWord],
      rhymesWith: await getRhymz(randomWord),
    };
  }

  res.json({
    addedToDB: rhymesWithDictionary[randomWord] === undefined ? false : true,
    word: randomWord,
    meaning: dictionary[randomWord],
    rhymesWith: rhymesWithDictionary[randomWord].rhymesWith,
  });
});

app.get("/word/:word", async (req, res) => {
  const desiredWord = req.params.word;

  if (desiredWord && !dictionary[desiredWord]) {
    dictionary[desiredWord] = {
      word: desiredWord,
      meaning: dictionary[desiredWord],
      rhymesWith: await getRhymz(desiredWord),
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
      rhymesWith: await getRhymz(desiredWord),
    };
    res.json(dictionary[desiredWord]);
  } else if (dictionary[desiredWord].rhymesWith) {
    res.json(dictionary[desiredWord]);
  } else {
    res.json({
      message: "Oh no, it looks like this word is not",
    });
  }
});

app.post("/populateRhymeDictionary", async (req, res) => {
  let count = 0;
  for (let key of Object.keys(dictionary)) {
    if (count === 1000) {
      await fs.writeFile(
        `${path.join(__dirname, "./resources/")}rhymesWith.json`,
        JSON.stringify(rhymesWithDictionary),
        function (err) {
          if (err) return console.log(err);
          console.log("Wrote to file rhymesWith.json");
        }
      );
      return;
    } else if (rhymesWithDictionary[key] === undefined) {
      console.log(`Adding ${key} to dictionary`);
      rhymesWithDictionary[key] = {
        meaning: dictionary[key],
        rhymesWith: await getRhymz(key),
      };
    }

    count++;
  }
});

// Create the urbanDictionary route getter
app.get("/urbanDictionary", (req, res) => {
  res.json({
    urbanDictionary,
  });
});

// Get random word from urbanDictionary
app.get("/urbanDictionaryRandomWord", (req, res) => {
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

// Fetch Rhymz
const getRhymz = async (word, res) => {
  return await rp(
    `https://www.rhymezone.com/r/rhyme.cgi?Word=${word}&typeofrhyme=perfect&org1=syl&org2=l&org3=y`
  )
    .then(async function (html) {
      const $ = cheerio.load(html);
      const rhymeArr = $("a.r", html);
      const rhymesWithArr = [];

      for (let rhyme of rhymeArr) {
        rhymesWithArr.push(rhyme.children[0].data);
      }
      console.log(rhymesWithArr);

      return rhymesWithArr;
    })
    .then((data) => data)
    .catch();
};

app.get("/", (req, res) => {
  console.log("success");
  res.sendFile(path.join(__dirname + "/API-Documentation/index.html"));
});
