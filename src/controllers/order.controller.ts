import { Request ,Response } from "express";
import { connectDb } from ".."
import { Order } from "../entities/order.entity";

export const Orders = async (req: Request, res: Response) => {
    const orders = await connectDb.getRepository(Order).find({
        where: {complete: true},
        relations: ['order_items']
    });

    res.send(orders.map((order: Order) => ({
        id: order.id,
        name: order.name,
        email: order.email,
        total: order.total,
        created_at: order.created_at,
        order_items: order.order_items
    })));
}