const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.get("/hello", (req, res) => {
	res.status(200).send("hello world");
	console.log("hello world");
});

router.post("/contactUs", (req, res) => {
	try {
		console.log(req.body);
		const transporter = nodemailer.createTransport({
			host: "smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "83879757102d76",
				pass: "26b547c866bb75",
			},
		});
		const mailOptions = {
			from: req.body.email,
			to: "contacto@gasdetect.com",
			subject: req.body.subject,
			text: req.body.message,
		};
		transporter.sendMail(mailOptions, (err, res) => {
			if (err) {
				console.log(err);
				res.send(err);
			} else {
				console.log("Email sent" + res.response);
			}
		});
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
