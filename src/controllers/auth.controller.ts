import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { sign , verify } from "jsonwebtoken";
import { connectDb } from "..";
import { User } from "../entities/user.entity";

export const Register = async (req: Request, res: Response) => {
    const { password, passwordConfirm, ...body } = req.body;

    if (password !== passwordConfirm) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await connectDb.getRepository(User).save({
        ...body,
        password: await bcryptjs.hash(password, 10),
        isAmbassador: false
    });

    delete user.password;
    
    res.send(user);
};

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const repo = connectDb.getRepository(User);

    const user = await repo.findOne({
        where: { email }, select: ["id", "password"]
    });
    if (!user) {
        return res.status(400).json({ error: "User or password invalid" }); 
    }
    if (!(await bcryptjs.compare(password, user.password))) {
        return res.status(400).json({ error: "User or password invalid" });
    }

    const token = sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAmbassador: user.isAmbassador
    }, process.env.SECRET_KEY);

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 *  24 
    });

    res.send({message: "Success"});
};

export const Logout = (req: Request, res: Response) => {
    
    res.cookie("jwt","", { maxAge:0 });

    res.send({message: "Success"});
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
    res.send(req["user"]);

};

export const UpdateInfo = async (req: Request, res: Response) => {
    const user = req["user"];

    const repo = connectDb.getRepository(User);

    await repo.update(user.id, req.body);

    res.send(await repo.findOne({where: {id: user.id}}));

};

export const UpdatePassword = async (req: Request, res: Response) => {
    const user = req["user"];
    const repo = connectDb.getRepository(User);
    const { password, passwordConfirm } = req.body;

    if (password!== passwordConfirm) {
        return res.status(400).json({ error: "Passwords do not match" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    await repo.update(user.id, { password: hashedPassword });
    res.send(await repo.findOne({where: {id: user.id}}));
};