import { Item } from "src/typeorm/entities/Item";

export class ItemDTO{
    id:number;
    ItemName:string;
    ItemPrice:number;
    restaurantId:number;
    constructor(item: Item) {
        this.id=item.id;
        this.ItemName=item.ItemName;
        this.ItemPrice=item.ItemPrice
        this.restaurantId=item.restaurant.id;
    }
}