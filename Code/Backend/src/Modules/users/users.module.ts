import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/Controllers/users/users.controller';
import { RestaurantsService } from 'src/Services/restaurants/restaurants.service';
import { UsersService } from 'src/Services/users/users.service';
import { Restaurant } from 'src/typeorm';
import { User } from 'src/typeorm/entities/User';

@Module({
    imports:[JwtModule.register({}),TypeOrmModule.forFeature([Restaurant, User])],
    controllers:[UsersController],
    providers:[UsersService,JwtService,RestaurantsService]
})
export class UsersModule {}
