import express from "express"
import userRouter from "./routes/user.routes"
import errorHandler from "./middlewares/error.middleware"
import  {StatusCodes}  from "http-status-codes";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(userRouter)
app.use(errorHandler)
app.get("/", (req, res) => {
    res.sendStatus(StatusCodes.OK)
})

app.listen(4000, ()=> {
    console.log("server ok 4000")
})