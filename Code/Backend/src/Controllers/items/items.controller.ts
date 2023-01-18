import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { FilterModel, ItemDTO } from 'src/dtos';
import { ItemsService } from 'src/Services/items/items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}
  @Post()
  createItem(@Body() itemDTO: ItemDTO) {
    this.itemService.createItem(itemDTO);
  }

  @Put(':id')
  updateItemById(
    @Param('id', ParseIntPipe) id: number, 
    @Body() itemDTO: ItemDTO
  ) {
    return this.itemService.updateItem(id, itemDTO);
  }

  @Delete(':id')
  DeleteItem(@Param('id', ParseIntPipe) id: number) {
    this.itemService.deleteItem(id);
  }

  @Post('filteredList')
  PaginatedRestaurants(
    @Body() filterModel: FilterModel,
  ) {
    return this.itemService.getPaginatedItems(filterModel);
  }
}
