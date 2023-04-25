const rp = require("request-promise");
const cheerio = require("cheerio");

const getRhymes = async (word) => {
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

      return rhymesWithArr;
    })
    .then((data) => data)
    .catch();
};

module.exports = getRhymes;
