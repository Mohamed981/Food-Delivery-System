import { Body, Controller, Post } from '@nestjs/common';
import { FilterModel, RestaurantDTO } from 'src/dtos';
import { RestaurantsService } from 'src/Services/restaurants/restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Post()
  createRestaurant(@Body() restaurantDTO: RestaurantDTO) {
    this.restaurantService.createRestaurant(restaurantDTO);
  }
  @Post('filteredList')
  PaginatedRestaurants(
    @Body() filterModel: FilterModel,
  ) {
    return this.restaurantService.getPaginatedRestaurants(filterModel);
  }
}
