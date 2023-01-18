import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from 'src/Controllers/items/items.controller';
import { ItemsService } from 'src/Services/items/items.service';
import { Item } from 'src/typeorm/entities/Item';
import { Restaurant } from 'src/typeorm/entities/Restaurant';

@Module({
    imports:[TypeOrmModule.forFeature([Item,Restaurant])],
    controllers:[ItemsController],
    providers:[ItemsService]
})
export class ItemsModule {}
