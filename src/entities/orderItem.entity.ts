import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('OrderItem')
export class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    price: number;

    @Column()
    product_title: string;

    @Column()
    quantity: number;
    
    @Column()
    ambassador_revenue: number;

    @Column()
    admin_revenue: number;

    @ManyToOne(() => Order, order => order.order_items)
    @JoinColumn({name: 'order_id'})
    order: Order;
}