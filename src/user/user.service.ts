import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const created = new this.userModel(createUserDto);
    return created.save();
  }

  async createWithPassword(dto: CreateUserDto & { password: string }) {
    const hash = await bcrypt.hash(dto.password, 10);
    const created = new this.userModel({ ...dto, password: hash });
    return created.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findByEmailWithPassword(email: string) {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async comparePassword(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }

  async findOne(id: string) {
    const doc = await this.userModel.findById(id).exec();
    if (!doc) throw new NotFoundException(`User with ID ${id} not found`);
    return doc;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updated = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`User with ID ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const res = await this.userModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException(`User with ID ${id} not found`);
    return { deleted: true };
  }
}
