import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { OrderItem } from "./orderItem.entity";
import { Link } from "./link.entity";

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    code: string;

    @Column()
    user_id: string;

    @Column({nullable: true})
    transaction_id: string;
    
    @Column()
    ambassador_email: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({nullable: true})
    address: string;

    @Column()
    email: string;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    zipCode: string;

    @Column({default: false})
    complete: boolean;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items: OrderItem[];

    @ManyToOne(() => Link, link => link.orders, {
        createForeignKeyConstraints: false
    })
    @JoinColumn({
        referencedColumnName: 'code',
        name: 'code'
    })
    link: Link;

    get name(): string {
        return this.first_name + ' ' + this.last_name;
    }

    get total(): number {
        return this.order_items.reduce((s, item) => s + item.admin_revenue, 0);
    }

    get ambassador_revenue(): number {
        return this.order_items.reduce((s, item) => s + item.ambassador_revenue, 0);
    }

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

}

function OneToManyColumn(arg0: () => typeof OrderItem, arg1: (orderItem: any) => any): (target: Order, propertyKey: "order_items") => void {
    throw new Error("Function not implemented.");
}
