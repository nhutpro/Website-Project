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
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//route//;
route(app);

app.listen(port, () => {
<<<<<<< HEAD
	console.log(`App listening at http://localhost:${port}`);
=======
    console.log(`App listening at http://localhost:${port}`);
>>>>>>> 37e517a938f1f79c632669ad25cbcc3562479ba4
});
