const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const port = 8000;
const routes = require("./src/routes/index.js");
const homePageRouter = require("./src/routes/homePage.js");
const myMiddleware = require("./src/middleware/index.js");

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

// add middleware to router
app.use(myMiddleware);

// // use the users and products routers
app.use("/api", routes);
app.use("/", homePageRouter);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
