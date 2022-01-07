import { Router, Request, Response, NextFunction } from "express";

const userRouter =  Router()
const users = [{
    name: "Gustavo"
}]

userRouter.get("/users", (req: Request, res: Response, next: NextFunction) => {
    res.send(users)
})

userRouter.get("/users/:id", (req: Request<{id:string}>, res: Response, next: NextFunction) => {
    const id = req.params.id
    res.send(users)
})

export default userRouter