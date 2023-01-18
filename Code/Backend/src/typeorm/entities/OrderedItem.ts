import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';
import { Order } from './Order';

@Entity()
export class OrderedItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Order,order => order.orderedItems)
    @JoinColumn()
    order: Order;

    @ManyToOne(()=>Item, item => item.orderedItems)
    @JoinColumn()
    item:Item;
}
