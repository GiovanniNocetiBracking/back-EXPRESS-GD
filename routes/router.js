const express = require("express");
const nodemailer = require("nodemailer");
const Vonage = require("@vonage/server-sdk");
const Suscriber = require("../models/suscriber");
const router = express.Router();

const transporter = nodemailer.createTransport({
	host: process.env.HOST,
	port: process.env.PORT_NM,
	auth: {
		user: process.env.USER_NM,
		pass: process.env.PASS_NM,
	},
});
const vonage = new Vonage(
	{
		apiKey: process.env.APIKEY,
		apiSecret: process.env.APISECRET,
	},
	{ debug: true }
);

/* router.get("/hello", (req, res) => {
	res.status(200).send("hello world");
	console.log("hello world");
}); */
router.post("/sendSmsNotifications", (req, res) => {
	const from = "Vonage APIs";
	const to = req.body.number;
	const text = req.body.text;

	vonage.message.sendSms(from, to, text, (err, responseData) => {
		if (err) {
			console.log(err);
		} else {
			if (responseData.messages[0]["status"] === "0") {
				console.log("Message sent successfully.");
			} else {
				console.log(
					`Message failed with error: ${responseData.messages[0]["error-text"]}`
				);
			}
		}
	});
});

router.post("/sendMailNotifications", (req, res) => {
	try {
		console.log(req.body);
		const mailOptions = {
			from: "notificaciones@gasdetect.com",
			to: req.body.email,
			subject: "Alerta! Gases detectados",
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

router.get("/suscribe", async (req, res) => {
	try {
		const suscribers = await Suscriber.find();
		console.log(suscribers);
	} catch (error) {
		console.log(error);
	}
});
router.post("/suscribe", async (req, res) => {
	const body = req.body;
	try {
		await Suscriber.create(body);
		console.log(res);
	} catch (error) {
		console.log(error);
	}
});

router.post("/contactUs", (req, res) => {
	try {
		console.log(req.body);
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
