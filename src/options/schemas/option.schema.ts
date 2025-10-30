import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Option extends Document {
  @Prop({ required: true })
  name: string;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
