import { RestaurantDTO } from "../Restaurant/Restaurant.dto";

export class Register{
    Username: string;
    IsOwner: boolean;
    Password: string;
    Email: string;
    userId:number;
    RestaurantName:string;
    Category:string;
    Salt: string;
}