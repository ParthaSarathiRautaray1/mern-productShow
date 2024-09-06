import Product from "../models/product.model.js"
import mongoose from "mongoose"


export const getProducts = async (req,res) =>{

    try{
        const products = await Product.find({}) // find all products on db
        res.status(200).json({sucess: true , data: products})
    }catch(error){
        console.log("Error in fetching Products" , error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}


export const createProduct =  async (req, res) => {
    //console.log("Received product data:", req.body); 

    
    const product = req.body // user will send this data 

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({sucess: false, message: "please provide all fields"})
    }

    //user passed everything to us :-
    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({ sucess: true , data: newProduct})
    }catch(error){
        console.error("Error in Create a product : ", error.message)
        res.status(500).json({sucess: false , message: "Server Error..."})
    }
}


export const updateProduct = async (req, res) => {

    const {id} = req.params;
    const product = req.body 
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false , message:"Invalid Product Id"})
    }

    try{
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true , data: updateProduct});
    }catch(error){
        res.status(500).json({success:false , message: "Server Error..."})
    }
}

export const deleteProduct = async (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false , message:"Invalid Product Id"})
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ sucess: true , message: "Product Deleted"})

    }catch(error){
        console.log("Error in delete Products" , error.message)
        res.status(500).json({sucess: false , message: "Server Error"})

    }
}