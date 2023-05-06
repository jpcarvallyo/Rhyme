import { getCurrentDagPrice, priceOfDagNode } from "./utils/index.js";
const currentPrice = document.querySelector("h2#currentPrice");
const inputPrice = document.querySelector("input#customPriceInput");
const customPrice = document.querySelector("h2#customPrice");
const dagCurrentPrice = document.querySelector("h2#dagCurrentPrice");
const submitBtn = document.querySelector("button");

const getPrice = async () => {
  const price = await getCurrentDagPrice();
  const nodePrice = await priceOfDagNode(price);
  currentPrice.textContent = `$${nodePrice.toLocaleString()}`;
  dagCurrentPrice.textContent = `$${price.toLocaleString()}`;
};

const setCustomPrice = () => {
  customPrice.textContent = `$${priceOfDagNode(
    inputPrice.value
  ).toLocaleString()}`;
};

currentPrice.textContent = "loading...";
getPrice();

submitBtn.addEventListener("click", (e) => {
  setCustomPrice();
});

customPriceInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    setCustomPrice();
  }
});
