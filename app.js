const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/router");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.zxn4h.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose
	.connect(uri)
	.then(() => {
		console.log("base de datos conectada");
	})
	.catch((err) => console.log(err));

app.use(express.json());
app.use(router);
app.use("/", express.static("public"));
app.listen(process.env.PORT, () => {
	console.log("port running on localhost:" + process.env.PORT);
});
