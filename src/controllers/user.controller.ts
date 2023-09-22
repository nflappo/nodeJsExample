import { Request, Response } from 'express';
import { connectDb } from '..';
import { User } from '../entities/user.entity';

export const Ambassadors = async (req: Request, res: Response) => {
    res.send(await connectDb.getRepository(User).find({where: {
        isAmbassador: true
    }}));
};