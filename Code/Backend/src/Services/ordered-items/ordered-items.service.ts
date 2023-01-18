import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderedItem } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderedItemsService {
    constructor(@InjectRepository(OrderedItem) private orderedItemRepository: Repository<OrderedItem>) {
        
    }
}
