import { OrderedItemDTO } from "../OrderedItem/OrderedItem.dto";

export class OrderDTO{
    Items:OrderedItemDTO[];
    userId:number;
    restaurantId:number;
    TotalPrice:number;
    Status:string;
}