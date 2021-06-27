import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import {readdirSync} from "fs"
const moragn = require("morgan")
require("dotenv").config()

const app = express()

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>console.log("DB connected"))
.catch((err)=>{
    console.log("Database error",err)
})

// apply middleware
app.use(cors())
app.use(express.json())
app.use(moragn('dev'))

// router
readdirSync("./routes").map(r=>{
    return app.use('/api',require(`./routes/${r}`))
})

// port
const port = process.env.PORT

app.listen((port), () => {
    console.log(`Server started on ${port}`);
});
