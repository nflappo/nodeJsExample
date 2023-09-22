import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Product')
export class Product{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;
    
    @Column()    
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;

}