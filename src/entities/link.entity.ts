import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity("Link")
export class Link {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    code: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToMany(() => Product)
    @JoinTable({
        name: "LinkProduct",
        joinColumns: [{ name: "linkId", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "productId", referencedColumnName: "id" }]
    })
    products: Product[];


    @OneToMany(() => Order, order => order.link, {
        createForeignKeyConstraints: false
    })
    @JoinColumn({
        referencedColumnName: 'code',
        name: 'code'
    })
    orders: Order[];
}