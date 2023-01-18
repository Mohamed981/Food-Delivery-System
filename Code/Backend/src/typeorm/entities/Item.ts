import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderedItem } from './OrderedItem';
import { Restaurant } from './Restaurant';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ItemName: string;

  @Column()
  ItemPrice: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.items)
  @JoinColumn()
  restaurant: Restaurant;

  @OneToMany(() => OrderedItem, (orderedItems) => orderedItems.item)
  orderedItems: OrderedItem[];
}
