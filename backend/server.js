import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import Product from "./models/product.model.js"
import mongoose, { mongo } from "mongoose"

import productRoutes from "./routes/product.route.js"

dotenv.config()

const app = express()

const PORT =process.env.PORT

app.use(express.json()); // allow us to accept json data in the req.body
 
app.use("/api/products", productRoutes)

app.listen(PORT, () =>{
    connectDB();
    console.log("Server started at htpps://localhost:"+PORT)
})


// fq8IekLD9v2vRmsa