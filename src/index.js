const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;
const route = require("./routes");
const db = require("./config/db");
db.connect();

app.use(express.static(path.join(__dirname, "public")));
//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      foo: (a, b) => {
        if (a == b) return true;
        else return false;
      },
      isEven: (number) => {
        if (number % 2 === 0) return true;
        else return false;
      },
      firstName: (fullName) => {
        return fullName.split(" ").splice(-1).join(" ");
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

//route//;
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
