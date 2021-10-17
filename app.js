const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router");
const app = express();

const port = 3000;
const dbname = "gasDetect";
const usr = "giovanni";
const pass = "F58H!.HkchqiEtC";
const uri = `mongodb+srv://${usr}:${pass}@cluster0.zxn4h.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose
	.connect(uri)
	.then(() => {
		console.log("base de datos conectada");
	})
	.catch((err) => console.log(err));

app.use(express.json());
app.use(router);
app.use("/", express.static("public"));

app.listen(port, () => {
	console.log("port running on localhost:" + port);
});
