import { Controller } from '@nestjs/common';
import { OrderedItemsService } from 'src/Services/ordered-items/ordered-items.service';

@Controller('ordered-items')
export class OrderedItemsController {
    constructor(private orderedItemService: OrderedItemsService) {}
}
