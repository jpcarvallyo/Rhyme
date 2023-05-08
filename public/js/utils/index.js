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

export const getDagData = async (type) => {
  const data = await fetch(`../../resources/dag-historical-data-${type}.json`)
    .then((resp) => resp.json())
    .then((data) => data);
  return data;
};

export const createTable = (data, type) => {
  // Get a reference to the container element where we'll insert the table
  const container = document.getElementById("table-container");
  if (container.children.length > 0) {
    container.innerHTML = "";
  }

  // Create a new table element and add it to the container
  const table = document.createElement("table");
  table.id = "table";
  table.dataset.type = type;
  container.appendChild(table);

  // Create a new table row for the header row
  const headerRow = document.createElement("tr");
  table.appendChild(headerRow);

  // Create a header cell for each column
  const dateHeader = document.createElement("th");
  dateHeader.textContent = "Date";
  headerRow.appendChild(dateHeader);

  const priceHeader = document.createElement("th");
  priceHeader.textContent = "Price";
  headerRow.appendChild(priceHeader);

  const dagNodePriceHeader = document.createElement("th");
  dagNodePriceHeader.textContent = "Dag Node Price";
  headerRow.appendChild(dagNodePriceHeader);

  // Loop through the data and create a new row for each item
  for (const item of data) {
    const row = document.createElement("tr");
    table.appendChild(row);

    // Create a cell for the date and add it to the row
    const dateCell = document.createElement("td");
    dateCell.textContent = item[0];
    row.appendChild(dateCell);

    // Create a cell for the price and add it to the row
    const priceCell = document.createElement("td");
    priceCell.textContent = `$${item[1]}`;
    row.appendChild(priceCell);

    // Create a cell for the name and add it to the row
    const dagNodeCell = document.createElement("td");
    dagNodeCell.textContent = `$${priceOfDagNode(item[1]).toLocaleString()}`;
    row.appendChild(dagNodeCell);
  }
};
