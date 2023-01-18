import { type } from 'os';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderedItem } from './OrderedItem';
import { Restaurant } from './Restaurant';
import { User } from './User';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    Status:string;

    @Column()
    TotalPrice:number;

    @ManyToOne(()=> User,user => user.orders) 
    @JoinColumn()
    user: User;

    @ManyToOne(()=> Restaurant,restaurant => restaurant.orders) 
    @JoinColumn()
    restaurant: Restaurant;

    @OneToMany(()=> OrderedItem,orderedItems => orderedItems.order)
    orderedItems: OrderedItem[];
}
