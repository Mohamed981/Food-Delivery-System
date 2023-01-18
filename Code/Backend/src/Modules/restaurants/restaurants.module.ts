import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsController } from 'src/Controllers/restaurants/restaurants.controller';
import { RestaurantsService } from 'src/Services/restaurants/restaurants.service';
import { Restaurant } from 'src/typeorm/entities/Restaurant';
import { User } from 'src/typeorm/entities/User';

@Module({
    imports:[TypeOrmModule.forFeature([Restaurant,User])],
    controllers:[RestaurantsController],
    providers:[RestaurantsService]
})
export class RestaurantsModule {}
