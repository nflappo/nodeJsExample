import { Request, Response } from "express";
import { connectDb } from "..";
import { Link } from "../entities/link.entity";
import { Equal } from "typeorm";

export const Links = async(req: Request, res: Response) => {

    const links = await connectDb.getRepository(Link).find({
        where: {
            user: Equal(req.params.id),
        }
    });

    return res.status(200).json({ links });
};