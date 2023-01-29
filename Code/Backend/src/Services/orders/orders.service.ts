import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDTO, OrderedItemDTO, RestaurantOrderDTO } from 'src/dtos';
import { Item, Order, OrderedItem, Restaurant, User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderedItem)
    private orderedItemRepository: Repository<OrderedItem>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async addOrederedItems(orderedItems: OrderedItemDTO[], order: Order) {
    for (const e of orderedItems) {
      let newOrderedItem = this.orderedItemRepository.create();
      newOrderedItem.order = order;
      let item = await this.itemRepository.findOne({
        where: { id: e.itemId },
        relations: ['orderedItems'],
      });
      newOrderedItem.item = item;
      this.orderedItemRepository.insert(newOrderedItem);
    }
  }

  async createOrder(orderDTO: OrderDTO) {
    orderDTO.Status = 'Preparing';
    const newOrder = await this.orderRepository.create({ ...orderDTO });
    const user = await this.userRepository.findOne({
      where: { id: orderDTO.userId },
      relations: ['orders'],
    });

    const restaurant = await this.restaurantRepository.findOne({
      where: { id: orderDTO.restaurantId },
      relations: ['orders'],
    });

    await this.orderRepository.insert(newOrder);
    this.addOrederedItems(orderDTO.Items, newOrder);
    user.orders.push(newOrder);
    await this.userRepository.save(user);
    restaurant.orders.push(newOrder);
    await this.restaurantRepository.save(restaurant);
  }

  updateOrder(id: number, orderDTO: OrderDTO) {
    this.orderRepository.update({ id }, { ...orderDTO });
  }

  async getRestaurantOrders(name: string) {
    const orders = await this.orderRepository.find({
      where: {
        restaurant: {
          RestaurantName: name,
        },
      },
      relations: {
        user: true,
        orderedItems: {
          item: true,
        },
      },
    });
    
    const restaurantOrders: RestaurantOrderDTO[] = [];
    let restaurantOrder: RestaurantOrderDTO = null;
    for (let e of orders) {
      restaurantOrder = new RestaurantOrderDTO()
      
      restaurantOrder.orderId = e.id;
      restaurantOrder.Status = e.Status;
      restaurantOrder.TotalPrice = e.TotalPrice;
      restaurantOrder.userId = e.user.id;
      restaurantOrder.Username = e.user.Username;
      let arr = e.orderedItems.map((e) => e.item.ItemName);
      restaurantOrder.Items=arr.join(',');
      restaurantOrders.push(restaurantOrder);
    }
    
    return restaurantOrders;
  }
}
