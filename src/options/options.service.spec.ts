import { Test, TestingModule } from '@nestjs/testing';
import { OptionsService } from './options.service';
import { getModelToken } from '@nestjs/mongoose';
import { Option } from './schemas/option.schema';

describe('OptionsService', () => {
  let service: OptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OptionsService,
        { provide: getModelToken(Option.name), useValue: {} },
      ],
    }).compile();

    service = module.get<OptionsService>(OptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
