import {
  getCurrentDagPrice,
  priceOfDagNode,
  getDagData,
  createTable,
} from "./utils/index.js";
const currentPrice = document.querySelector("h2#currentPrice");
const inputPrice = document.querySelector("input#customPriceInput");
const customPrice = document.querySelector("h2#customPrice");
const dagCurrentPrice = document.querySelector("h2#dagCurrentPrice");
const submitBtn = document.querySelector("button");
const sectionWTable = document.querySelector("section#dagHistorical");
const controlPad = document.querySelector("div#control-pad");

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

document.querySelector("div#control-pad").addEventListener("click", (e) => {
  // e.preventDefault();
  let type = e.target.dataset.type;

  document.querySelectorAll("h3.type").forEach((element) => {
    console.log(element.classList);
    if (element.classList.contains("active")) {
      console.log(element, "true");
      element.classList.toggle("active");
    }
  });

  if (e.target.tagName === "H3") {
    console.log(type);
    e.target.classList.add("active");
    produceHistorical(type);
  }
});

const produceHistorical = async (type = "date") => {
  let data = await getDagData(type);
  // Create an array of objects to represent the data for each row
  createTable(data, type);
};

produceHistorical();
