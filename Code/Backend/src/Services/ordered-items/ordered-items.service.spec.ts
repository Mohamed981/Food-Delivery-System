import { Test, TestingModule } from '@nestjs/testing';
import { OrderedItemsService } from './ordered-items.service';

describe('OrderedItemsService', () => {
  let service: OrderedItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderedItemsService],
    }).compile();

    service = module.get<OrderedItemsService>(OrderedItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
