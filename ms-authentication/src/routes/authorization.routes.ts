import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import Jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import authenticationMiddleware from "../middlewares/authentication.middleware";
import bearerTokenMiddleware from "../middlewares/bearerToken.middleware";

const authorizationRouter = Router()

authorizationRouter.post("/token",authenticationMiddleware,(req: Request, res: Response, next: NextFunction) => {

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
authorizationRouter.post("/token/validate",bearerTokenMiddleware,(req: Request, res: Response, next: NextFunction) =>{
    res.sendStatus(StatusCodes.OK)

})
export default authorizationRouter