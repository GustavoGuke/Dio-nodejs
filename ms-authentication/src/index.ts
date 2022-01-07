import express, { Request, Response, NextFunction } from "express"

const app = express()
app.use(express.json())

app.get("/status", (req: Request, res: Response, next: NextFunction)=> {
    res.send("servidor ok")
})

app.listen(5000, ()=> {
    console.log("server ok 5000")
})