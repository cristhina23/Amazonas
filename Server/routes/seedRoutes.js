import express from "express";
import Product from "../Models/productModel.js";
import data from "../data.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  // crear la coleccion de productos desde mi data.js a la base de datos
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
});

export default seedRouter;
