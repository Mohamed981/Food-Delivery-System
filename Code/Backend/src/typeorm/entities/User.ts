import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';
import { Restaurant } from './Restaurant';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Username:string;

    @Column()
    IsOwner:boolean;

    @Column()
    Email:string;

    @Column()
    Password:string;

    @Column()
    Salt:string;

    @OneToOne(()=> Restaurant, restaurant => restaurant.user)
    restaurant: Restaurant;

    @OneToMany(()=> Order,orders => orders.user) 
    orders: Order[];
}
