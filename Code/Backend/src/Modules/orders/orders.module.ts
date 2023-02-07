import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from 'src/Controllers/orders/orders.controller';
import { OrdersService } from 'src/Services/orders/orders.service';
import { UsersService } from 'src/Services/users/users.service';
import { Item } from 'src/typeorm/entities/Item';
import { Order } from 'src/typeorm/entities/Order';
import { OrderedItem } from 'src/typeorm/entities/OrderedItem';
import { Restaurant } from 'src/typeorm/entities/Restaurant';
import { User } from 'src/typeorm/entities/User';

@Module({
    imports:[TypeOrmModule.forFeature([Order, OrderedItem, Item, User, Restaurant])],
    controllers:[OrdersController],
    providers:[OrdersService,UsersService,JwtService]
})
export class OrdersModule {}
