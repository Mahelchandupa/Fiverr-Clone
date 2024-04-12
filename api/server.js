import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

import userRoute from "./routes/user.route.js"
import orderRoute from "./routes/order.route.js"
import messageRoute from "./routes/message.route.js"
import reviewRoute from "./routes/review.route.js"
import conversationRoute from "./routes/conversation.route.js"
import authRoute from "./routes/auth.route.js"
import gigRoute from "./routes/gig.route.js"

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config()


const Connectdb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDb ")
      
    } catch (error) {
        console.log(error);
    }
}

//Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/orders", orderRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)
app.use("/api/reviews", reviewRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
});


//mongoDb pw : chandupa

app.listen(8000, () => {
    Connectdb()
    console.log("Backend is running")
})