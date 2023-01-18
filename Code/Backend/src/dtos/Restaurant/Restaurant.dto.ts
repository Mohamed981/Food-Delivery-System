import { Restaurant } from "src/typeorm/entities/Restaurant";

export class RestaurantDTO{
    id:number;
    userId:number;
    RestaurantName:string;
    Category:string;
    constructor(item: Restaurant) {
        Object.assign(this, item);
    }
}