import {Product} from '../models/index.js';


export const getProducts = async (req, res) =>{
    try{
        const {park, style} = req.query;
        const filter = {...(park && {park}), ...(style && {style}),};
        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

export const getProductBySlug = async (req, res) =>{
    try{
        const slug = req.params.slug;
        const product = await Product.findOne({slug});
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

export const createProduct = async (req, res) =>{
    try{
        const product = req.body;
        const response = await Product.create(product);
        res.status(201).json(response);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

export const updateProduct = async (req, res) =>{
    try{
        const product = req.body;
        const slug = req.params.slug;
        const response = await Product.findOneAndUpdate({slug}, product, {new: true});
        if(!response){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

export const deleteProduct = async (req, res) =>{
    try{
        const slug = req.params.slug;
        const response = await Product.findOneAndDelete({slug});
        if(!response){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(response);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};