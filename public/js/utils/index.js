export const getCurrentDagPrice = async () => {
  return await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=constellation-labs&vs_currencies=usd`
  )
    .then((resp) => {
      const price = resp;
      return price.json();
    })
    .then((data) => data["constellation-labs"]["usd"])
    .catch();
};

export const priceOfDagNode = (price) => {
  const requiredDag = 250000;
  return requiredDag / (1 / price);
};
