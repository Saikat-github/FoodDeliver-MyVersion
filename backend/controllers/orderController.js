import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import  Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user oder for frontend
const placeOrder = async (req, res) => {
    const url = "https://fooddeliver-myversion-frontend.onrender.com/"
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            paymentMethod: req.body.paymentMethod
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});
        
        if(req.body.paymentMethod === "Stripe") {
            const line_items = req.body.items.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name
                    },
                    unit_amount:item.price*100
                },
                quantity:item.quantity
            }))
    
            line_items.push({
                price_data: {
                    currency:"inr",
                    product_data: {
                        name: "Delivery Charges"
                    },
                    unit_amount:20*100
                },
                quantity: 1
            })
    
    
            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`,
            });
    
            res.json({success:true, session_url:session.url})
        } else {
            res.json({success:true, session_url:`${url}/myorders`})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"});
        throw error; 
    }
}


//verify payment 
const verifyOrder = async (req, res) => {
    const {success, orderId} = req.body;
    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            res.json({success: true, message: "Paid"})
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: true, message: "Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error Occurred"});
        throw error;
    }
}

//user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success:true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error Occurred"})
        throw error;
    }
}


//listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error Occurred"})
        throw error;
    }
}


//api for updating order status
const updateOrder = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {...req.body});
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error Occurred"})
        throw error;
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateOrder};