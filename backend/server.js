import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000

const allowedOrigins = [,               
    process.env.FRONTEND_URL,   
    process.env.ADMIN_URL   
];

//middleware
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true  
}));

//DB connection 
connectDB();

//API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API working well")
});


app.listen(port, () => {
    console.log("App is listening on port", port)
})