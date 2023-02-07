import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Headers,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { OrderDTO } from 'src/dtos';
import { OrdersService } from 'src/Services/orders/orders.service';
import { UsersService } from 'src/Services/users/users.service';
import { JwtGuard } from 'src/utils/jwt.guard';

@Controller('orders')
@UseGuards(JwtGuard)
export class OrdersController {
  constructor(
    private orderService: OrdersService,
    private userService: UsersService,
  ) {}

  @Post()
  createOrder(@Body() orderDTO: OrderDTO, @Req() request) {
    if (request.user.isOwner) return HttpStatus.UNAUTHORIZED;
    this.orderService.createOrder(orderDTO);
  }

  @Put(':id')
  updateOrderById(
    @Param('id', ParseIntPipe) id: number,
    @Body() orderDTO: OrderDTO,
    @Req() request,
  ) {
    if (!request.user.isOwner) return HttpStatus.UNAUTHORIZED;
    return this.orderService.updateOrder(id, orderDTO);
  }

  @Get('userOrders/:id')
  getUserOrders(@Param('id', ParseIntPipe) id: number, @Req() request) {
    if (request.user.isOwner) return HttpStatus.UNAUTHORIZED;
    return this.orderService.getUserOrders(id);
  }

  @Get(':restaurantName')
  getRestaurantOrders(@Param('restaurantName') name: string) {
    return this.orderService.getRestaurantOrders(name);
  }
}
