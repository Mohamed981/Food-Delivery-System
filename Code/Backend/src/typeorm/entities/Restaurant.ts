import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';
import { Order } from './Order';
import { User } from './User';

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    RestaurantName:string;

    @Column()
    Category:string;

    @OneToOne(()=> User, user => user.restaurant)
    @JoinColumn()
    user: User;

    @OneToMany(()=>Item,items=>items.restaurant)
    items: Item[];

    @OneToMany(()=>Order, orders=>orders.restaurant)
    orders: Order[];
}
