const rp = require("request-promise");

const getCurrentDagPrice = async () => {
  return await rp(
    `https://api.coingecko.com/api/v3/simple/price?ids=constellation-labs&vs_currencies=usd`
  )
    .then((resp) => {
      console.log(resp);
      const price = JSON.parse(resp);

      return price["constellation-labs"]["usd"];
    })
    .catch();
};

module.exports = getCurrentDagPrice;
