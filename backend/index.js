import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import geminiResponse from "./gemini.js"


const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
const port=process.env.PORT 
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.get("/",(req,res)=>{
    res.send("api is working")
}
)


app.listen(port,()=>{
    connectDb()
    console.log(`server is started on port${port}`)
})

