import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products});
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const createProduct = async(req, res) => {
    const product = req.body; // user will send the data in the body of the request 

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product); // create a new product using the product model
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }   catch (error) {
        console.error("Error in Create product:", error.message);    
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const updateProduct = async(req, res) => {
    const {id} = req.params; // get the id from the url
    const product = req.body; // user will send the data in the body of the request 

    // check if the product id exists or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Product Id' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // find the product by id and update it
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in updating product:", error.message);    
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const deleteProduct = async(req, res) => {
    const {id} = req.params; // get the id from the url

    // check if the product id exists or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Product Id' });
    }
    
    try {
        await Product.findByIdAndDelete(id); // find the product by id and delete it
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } 
    catch (error) {
        console.error("Error in deleting product:", error.message);   
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}