const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/router");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.zxn4h.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose
	.connect(uri)
	.then(() => {
		console.log("base de datos conectada");
	})
	.catch((err) => console.log(err));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
});
app.use(express.json());
app.use(router);
app.use("/", express.static("public"));
app.listen(process.env.PORT, () => {
	console.log("port running on localhost:" + process.env.PORT);
});
