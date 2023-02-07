import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { FilterModel, RestaurantDTO, Result } from 'src/dtos';
import { RestaurantsService } from 'src/Services/restaurants/restaurants.service';
import { JwtGuard } from 'src/utils/jwt.guard';

@Controller('restaurants')
@UseGuards(JwtGuard)
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Get(':name')
  async GetRestaurant(@Param('name') name: string) {
    let result = new Result<RestaurantDTO>();
    result.results = await this.restaurantService.GetRestaurantByName(name);
    return result;
  }
  @Post('filteredList')
  PaginatedRestaurants(@Body() filterModel: FilterModel) {
    return this.restaurantService.getPaginatedRestaurants(filterModel);
  }
}
