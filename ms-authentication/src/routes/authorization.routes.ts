import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import Jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import authenticationMiddleware from "../middlewares/authentication.middleware";

const authorizationRouter = Router()

authorizationRouter.post("/token",authenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {user} = req
        if(!user){
            throw new ForbiddenError("user or password not found")
        }
        const jwtPayload = { username: user.username }
        const jwtOptions = { subject: user?.uuid }
        const secretKey = "my_secret_key"

        const jwt = Jwt.sign(jwtPayload, secretKey, jwtOptions)
        res.status(StatusCodes.OK).json({ token: jwt })

    } catch (error) {
        next(error)
    }
})
export default authorizationRouter