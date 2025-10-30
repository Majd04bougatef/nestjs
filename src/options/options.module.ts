import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { Option, OptionSchema } from './schemas/option.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Option.name, schema: OptionSchema }])],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
