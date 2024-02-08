require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors")
const port = process.env.PORT;

const app = express()

// config JSON and form data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// solve CORS
/* app.use(cors({credentials: true, origin: "http://localhost:5173"})) */
app.use(cors({credentials: true, origin: "https://instagramclone-leob.netlify.app"}))

// upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// DB connection
require("./config/db.js")

// routes
const router = require('./routes/Router')
app.use(router)

app.listen(port, () => {
	console.log("App rodando na porta: ", port)
})

process.on('exit', () => {
	console.log("DESLIGANDO EXIT")
	app.use((req, res) => {
		res.status(503).send("API desligando.")
	})
})

process.on('SIGINT', () => {
	res.send("SIGINT.")
	server.close(() => {
		console.log('Servidor fechado.');
		process.exit(0);
	  });
})

