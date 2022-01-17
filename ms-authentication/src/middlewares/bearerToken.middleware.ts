import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function bearerTokenMiddleware(req: Request, res: Response, next: NextFunction){

    try {
        const authorizationHeader = req.headers["authorization"]
        if (!authorizationHeader) {
            throw new ForbiddenError("Credenciais não informadas")
        }

        const [type, token] = authorizationHeader.split(" ")
        if (type !== "bearer" || !token) {
            throw new ForbiddenError("Credenciais não informadas")
        }

        const tokenPayload = JWT.verify(token, "my_secret_key")
        if(typeof tokenPayload !== "object" || !tokenPayload.sub){
            throw new ForbiddenError("Token inválido")
        }
        const uuid = tokenPayload.sub

       const user = {uuid: tokenPayload.sub, username: tokenPayload.username}
       req.user = user
        next()
    } catch (error) {
        next(error)
    }

}
export default bearerTokenMiddleware