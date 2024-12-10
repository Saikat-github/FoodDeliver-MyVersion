import express from 'express';
import { addFood, editFood, getFoodDetails, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';


const foodRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
});

const upload = multer({storage: storage});


foodRouter.get("/get/:id", getFoodDetails);
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.patch("/edit/:id", upload.single("image"), editFood)
foodRouter.get("/list", listFood);
foodRouter.post("/remove/:id", removeFood);



export default foodRouter;