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
  let type = e.target.dataset.type;

  document.querySelectorAll("h3.type").forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.toggle("active");
    }
  });

  if (e.target.tagName === "I") {
    e.target.parentElement.classList.add("active");
  }

  e.target.classList.add("active");

  // For toggling DATE direction in asc/dsc
  if (
    (e.target.tagName === "H3" && e.target.classList.contains("date")) ||
    e.target.tagName === "I"
  ) {
    document.querySelector("i.fa-chevron-down").classList.toggle("rotate");
    if (e.target.dataset.dir === "dsc") {
      e.target.dataset.dir = "asc";
    } else {
      e.target.dataset.dir = "dsc";
    }
    type += `-${e.target.dataset.dir}`;
  }

  produceHistorical(type);
});

const produceHistorical = async (type = "date-asc") => {
  let data = await getDagData(type);
  // Create an array of objects to represent the data for each row
  createTable(data, type);
};

produceHistorical();
