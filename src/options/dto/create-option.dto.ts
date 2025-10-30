import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto {
      @ApiProperty({ example: 'Genie Logiciel' })
      @IsString()
      name: string;
}