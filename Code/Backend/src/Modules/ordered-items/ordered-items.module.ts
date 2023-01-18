import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderedItemsController } from 'src/Controllers/ordered-items/ordered-items.controller';
import { OrderedItemsService } from 'src/Services/ordered-items/ordered-items.service';
import { OrderedItem } from 'src/typeorm/entities/OrderedItem';

@Module({
    imports:[TypeOrmModule.forFeature([OrderedItem])],
    controllers:[OrderedItemsController],
    providers:[OrderedItemsService]
})
export class OrderedItemsModule {}
