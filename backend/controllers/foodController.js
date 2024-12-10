import foodModel from "../models/foodModel.js";
import fs from 'fs';


//add  food item
const getFoodDetails = async (req, res) => {
    try {
        let {id} = req.params;
        let food = await foodModel.findById(id);
        res.json({success:true, data: food})
    } catch (error) {
        res.json({success:false, message: error.message});
        throw error;
    }
}
const addFood = async (req, res) => {
    try {
        let image_filename = `${req.file.filename}`;

        const food = new foodModel({
            ...req.body, image: image_filename
        });
    
        await food.save();
        res.json({success: true, message: "Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
        throw error;
    }
}

//Edit a food item
const editFood = async (req, res) => {
    try {
        let {id} = req.params;
        if(req.file) {
            let image_filename = `${req.file.filename}`;
            const food = await foodModel.findById(id);
            fs.unlink(`uploads/${food.image}`, ()=>{})
            await foodModel.findByIdAndUpdate(id, {...req.body, image: image_filename})
        } else {
            await foodModel.findByIdAndUpdate(id, {...req.body});
        }

        res.json({success: true, message: "Food edited"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
        throw error;
    }
}

//All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}


//Remove food item
const removeFood = async (req, res) => {
    try {
        let {id} = req.params;
        const food = await foodModel.findById(id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(id);
        res.json({success: true, message: "Food removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}


export {addFood, listFood, removeFood, editFood, getFoodDetails}