import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import paymentRoute from "./routes/paymentRoutes.js";
import cors from "cors";
import bodyParser from 'body-parser';
config({ path: "./config/config.env" });

export const app = express();


const productSchema = new mongoose.Schema({
  username: String,
  password: String,
  id: String,
  name: String,
  company:String,
  price: Number,
  description:String ,
  category:String ,
  feature:String


});

const Product = mongoose.model('Product', productSchema);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);
app.get('/products',async (req,res)=>{
 
  const docs = await Product.find(req.query);
  res.json(docs)
});
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })

  
);
