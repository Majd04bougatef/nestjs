import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Role = 'ADMIN' | 'ETUDIANT';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  avatar?: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ enum: ['ADMIN', 'ETUDIANT'], default: 'ETUDIANT' })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
