import express from 'express';
import { listOrders, placeOrder, updateOrder, userOrders, verifyOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';


const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/listorders", listOrders);
orderRouter.post("/update", updateOrder)




export default orderRouter;
