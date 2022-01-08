import { NextFunction, Request, Response, Router } from "express";
import userRepository from "../repositories/user.repository";


const userRouter =  Router()


userRouter.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    
    const users = await userRepository.findAllUsers()
    res.send(users)
})

userRouter.get("/users/:id", (req: Request<{id:string}>, res: Response, next: NextFunction) => {
    const id = req.params.id
    res.send(id)
})

userRouter.post("/users", (req: Request, res: Response, next: NextFunction) => {
    const {name} = req.body
    res.send(name)

})

userRouter.put("/users/:id", (req: Request<{id:string}>, res: Response, next: NextFunction) => {
   
    const id = req.params.id
    const modifiedUser = req.body

    modifiedUser.id = id

    res.send(modifiedUser)

})


userRouter.delete("/users/:id", (req: Request<{id:string}>, res: Response, next: NextFunction) => {
    const id = req.params.id
    res.send(id)
})

export default userRouter