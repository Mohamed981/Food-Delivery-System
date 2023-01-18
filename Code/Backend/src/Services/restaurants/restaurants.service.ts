import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterModel, PagedResult, RestaurantDTO } from 'src/dtos';
import { Restaurant, User } from 'src/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createRestaurant(restaurantDTO: RestaurantDTO) {
    let user = await this.userRepository.findOne({
      where: { id: restaurantDTO.userId },
    });

    const newRestaurant = this.restaurantRepository.create({
      ...restaurantDTO,
    });
    newRestaurant.user = user;
    this.restaurantRepository.insert(newRestaurant);
  }

  async getPaginatedRestaurants(
    filterModel: FilterModel,
  ) {
    let restaurants = await this.restaurantRepository.find({
      where: [
        { RestaurantName: Like(filterModel.SearchObject + '%') },
        { Category: Like(filterModel.SearchObject + '%') },
      ],
      select: {
        RestaurantName: true,
        Category: true,
        id: true,
      },
    });
    let pagedResult: PagedResult<RestaurantDTO> =
      new PagedResult<RestaurantDTO>();
    const start = (filterModel.PageNumber - 1) * filterModel.PageSize;
    const end = Math.min(restaurants.length, start + filterModel.PageSize);
    pagedResult.TotalRecords = restaurants.length;
    if (start > restaurants.length) restaurants = [];
    else restaurants = restaurants.slice(start, end);
    pagedResult.Results = restaurants.map((item) => new RestaurantDTO(item));
    return pagedResult;
  }
}
