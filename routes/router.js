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

router.post("/sendSmsNotifications", (req, res) => {
	try {
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
			res.send(responseData);
		});
	} catch (error) {
		res.send(error);
	}
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
			} else {
				console.log("Email sent" + res.response);
			}
		});
		res.send(res);
	} catch (err) {
		res.send(err);
		console.error(err);
	}
});

router.get("/suscribe", async (req, res) => {
	try {
		const suscribers = await Suscriber.find();
		console.log(suscribers);
		res.send("Se a suscrito con exito");
	} catch (error) {
		console.log(error);
		res.send("A ocurrido un error");
	}
});
router.post("/suscribe", async (req, res) => {
	const body = req.body;
	try {
		await Suscriber.create(body);
		console.log(res);
		res.send("Se a suscrito con exito");
	} catch (error) {
		console.log(error);
		res.send("A ocurrido un error");
	}
});

router.post("/contactUs", async (req, res) => {
	try {
		console.log(req.body);
		const mailOptions = {
			from: req.body.email,
			to: "contacto@gasdetect.com",
			subject: req.body.subject,
			text: req.body.message,
		};
		await transporter.sendMail(mailOptions, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Email sent");
			}
		});
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.send("A ocurrido un error mientras se enviaba en correo");
	}
});

module.exports = router;
