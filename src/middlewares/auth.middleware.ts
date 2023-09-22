import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { connectDb } from "..";
import { User } from "../entities/user.entity";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies["jwt"];

        const payload: any = verify(jwt, process.env.SECRET_KEY);
        
        if(!payload) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req["user"]  = await connectDb.getRepository(User).findOne({
            where: { id: payload.id }
        });

        next();

    }catch (err) {
        return res.status(401).json({ error: "Unauthorized" });
    }
};