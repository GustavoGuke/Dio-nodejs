import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

const authorizationRouter = Router()

authorizationRouter.post("/token", async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authorizationHeader = req.headers["authorization"]
        if (!authorizationHeader) {
            throw new ForbiddenError("Credenciais não informadas")
        }

        const [type, token] = authorizationHeader.split(" ")
        if(type !== "Basic" || !token){
            throw new ForbiddenError("Credenciais não informadas")
        }

        const tokenContent = Buffer.from(token, "base64").toString("utf-8")
        const [username, password] = tokenContent.split(":")

        if(!username || !password){
            throw new ForbiddenError("Credenciais não preenchidas")
        }

        const user = await userRepository.findByUsernameAndPassword(username, password)

        console.log(user)
        res.send()

    } catch (error) {
        next(error)
    }
})
export default authorizationRouter