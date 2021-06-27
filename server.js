import express from "express"
import cors from "cors"
const moragn = require("morgan")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(moragn('dev'))


const port = process.env.PORT || 8000

app.listen((port), () => {
    console.log(`Server started on ${port}`);
});
