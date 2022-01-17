import { NextFunction, Request, Response, Router } from "express";
import bearerTokenMiddleware from "../middlewares/bearerToken.middleware";

import userRepository from "../repositories/user.repository";


const userRouter = Router()


userRouter.get("/users", async (req: Request, res: Response, next: NextFunction) => {

    const users = await userRepository.findAllUsers()
    res.send(users)
})

userRouter.get("/users/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    
    try {
        const id = req.params.id
        const user = await userRepository.findById(id)
        res.send(user)
        
    } catch (error) {
        next(error)
    }
})

userRouter.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body
    const user = await userRepository.create(name)
    res.send(user)

})

userRouter.put("/users/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {

    const uuid = req.params.id
    const modifiedUser = req.body
    modifiedUser.uuid = uuid
    await userRepository.update(modifiedUser)

    res.send("Update success")

})


userRouter.delete("/users/:id", async(req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.id
    await userRepository.remove(uuid)
    res.send("user Deleted with success")
})

export default userRouter