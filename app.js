const express = require("express");
const router = require("./routes/router");
const app = express();
app.use(express.json());
app.use(router);
app.use("/", express.static("public"));
const port = 3000;
app.listen(port, () => {
	console.log("port running on localhost:" + port);
});
