import { Request ,Response } from "express";
import { connectDb } from ".."
import { Product } from "../entities/product.entity";


export const Products = async (req: Request, res: Response) => {
    res.send(await connectDb.getRepository(Product).find());
};

export const CreateProduct = async (req: Request, res: Response) => {
    res.status(201).json(await connectDb.getRepository(Product).save(req.body));
};


export const UpdateProduct = async (req: Request, res: Response) => {
    await connectDb.getRepository(Product).update(req.params.id, req.body);

    res.status(202).send(await connectDb.getRepository(Product).findOne({where: {
        id: req.params.id
    } }));
};

export const DeleteProduct = async (req: Request, res: Response) => {
    await connectDb.getRepository(Product).delete(req.params.id);

    res.status(204).send(null);
};

export const GetProductByTitle = async (req: Request, res: Response) => {
    res.json(await connectDb.getRepository(Product).findOne({where: {
        title: req.params.title
    } }));
};

export const GetProductById = async (req: Request, res: Response) => {
    const product = await connectDb.getRepository(Product).findOne({
        where: { id: req.params.id }
    });

    if(!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({product: product});
};