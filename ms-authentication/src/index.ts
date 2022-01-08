import express from "express"
import userRouter from "./routes/user.routes"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(userRouter)

app.listen(4000, ()=> {
    console.log("server ok 4000")
})