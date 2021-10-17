const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suscriberSchema = new Schema({
	email: String,
});

const Suscriber = mongoose.model("Suscriber", suscriberSchema);

module.exports = Suscriber;
