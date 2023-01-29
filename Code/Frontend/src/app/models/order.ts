import { OrderedItem } from "./ordered-item";

export class Order{
    Items:OrderedItem[];
    userId:number;
    restaurantId:number;
    TotalPrice:number;
}