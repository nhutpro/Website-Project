const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const port = 3000;
const route = require("./routes");
const db = require("./config/db");
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
  })
);
// Method override
app.use(methodOverride("_method"));
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
      currentChange: (price) => {
        price = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price);
        return price;
      },
      firstName: (fullName) => {
        return fullName.split(" ").splice(-1).join(" ");
      },
      totalPrice: (price, num) => {
        return price * num;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//route//
route(app);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
