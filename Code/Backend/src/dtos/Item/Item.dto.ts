import { Item } from "src/typeorm/entities/Item";

export class ItemDTO{
    ItemName:string;
    ItemPrice:number;
    restaurantId:number;
    constructor(item: Item) {
        this.ItemName=item.ItemName;
        this.ItemPrice=item.ItemPrice
        this.restaurantId=item.restaurant.id;
    }
}