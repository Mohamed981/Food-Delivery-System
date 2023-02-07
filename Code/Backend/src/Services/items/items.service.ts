import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterModel, ItemDTO, PagedResult } from 'src/dtos';
import { Item, Restaurant } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async createItem(itemDTO: ItemDTO) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: itemDTO.restaurantId },
      relations: ['items'],
    });

    const newItem = await this.itemRepository.create({ ...itemDTO });
    await this.itemRepository.save(newItem);
    restaurant.items.push(newItem);
    this.restaurantRepository.save(restaurant);
    
  }

  async updateItem(id: number, itemDTO: ItemDTO) {
    await this.itemRepository.save({ ...itemDTO });
  }

  deleteItem(id: number) {
    return this.itemRepository.delete({ id });
  }

  async getPaginatedItems(filterModel: FilterModel) {
    
    let items = await this.itemRepository.find({
        relations: { restaurant: true },
      where: { restaurant: { RestaurantName: filterModel.SearchObject } },
      select: {
        ItemName: true,
        ItemPrice: true,
        id: true,
      },
    });
  
    let pagedResult: PagedResult<ItemDTO> = new PagedResult<ItemDTO>();
    const start = (filterModel.PageNumber - 1) * filterModel.PageSize;
    const end = Math.min(items.length, start + filterModel.PageSize);
    pagedResult.TotalRecords = items.length;
    if (start > items.length) items = [];
    else items = items.slice(start, end);
    pagedResult.Results = items.map((item) => new ItemDTO(item));
    return pagedResult;
  }
}
