import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OrderDTO } from 'src/dtos';
import { OrdersService } from 'src/Services/orders/orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService) {}

    @Post()
    createOrder(@Body() orderDTO: OrderDTO) {
      this.orderService.createOrder(orderDTO);
    }

    @Put(':id')
    updateOrderById(
      @Param('id', ParseIntPipe) id: number, 
      @Body() orderDTO: OrderDTO
    ) {
      return this.orderService.updateOrder(id, orderDTO);
    }

    @Get(':name')
    getOrders( @Param('name') name: string){
        return this.orderService.getRestaurantOrders(name);
    }
}
