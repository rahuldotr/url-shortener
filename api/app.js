require("dotenv").config();
let express = require("express");
bodyParser = require("body-parser");
let mongoose = require("mongoose");
let app = express();
let figlet = require("figlet");
let morgan = require("morgan");
let database = mongoose.connection;
let mongoString = process.env.DATABASE_URL;
let cors = require('cors');

app.use(cors());

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"));

database.on("error", () => {
  figlet("ERROR!", function (err, data) {
    console.log(data);
  });
});
database.once("connected", () => {
  figlet(" API is up ! ", function (err, data) {
    console.log(data);
  });
});
mongoose.set('strictQuery', false);
mongoose.connect(mongoString);

// routes
app.use("/", require("./routes"));

// Throw error if no route is matched
app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Page not found!!",
  });
});
app.use((err, req, res, next) => {
  res.status(err.code ?? 500 ).send(err)
})
app.listen( process.env.API_PORT);
