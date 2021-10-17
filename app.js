const express = require("express");
const app = express();
app.use(express.json());
app.use("/", express.static("public"));
const port = 3000;

app.get("/hello", (req, res) => {
	res.status(200).send("hello world");
});

app.listen(port, () => {
	console.log("port running on localhost: " + port);
});
