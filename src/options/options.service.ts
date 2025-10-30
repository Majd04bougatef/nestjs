import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Option } from './schemas/option.schema';

@Injectable()
export class OptionsService {
  constructor(@InjectModel(Option.name) private optionModel: Model<Option>) {}

  async create(createOptionDto: CreateOptionDto) {
    const created = new this.optionModel(createOptionDto);
    return created.save();
  }

  async findAll() {
    return this.optionModel.find().exec();
  }

  async findOne(id: string) {
    const doc = await this.optionModel.findById(id).exec();
    if (!doc) throw new NotFoundException(`Option with ID ${id} not found`);
    return doc;
  }

  async update(id: string, updateOptionDto: UpdateOptionDto) {
    const updated = await this.optionModel
      .findByIdAndUpdate(id, updateOptionDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Option with ID ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const res = await this.optionModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException(`Option with ID ${id} not found`);
    return { deleted: true };
  }
}
