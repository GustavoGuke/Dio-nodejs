import express, { Request, Response, NextFunction } from "express"
import userRouter from "./routes/user.routes"
const app = express()
app.use(express.json())

app.use(userRouter)

app.listen(5000, ()=> {
    console.log("server ok 5000")
})