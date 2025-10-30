import { IsEmail, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Alice' })
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Martin' })
    @IsString()
    lastName: string;

    @ApiProperty({ example: 'U12345' })
    @IsString()
    studentId: string;

    @ApiProperty({ example: 'alice.martin@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 21, minimum: 0 })
    @Type(() => Number)
    @IsInt()
    @Min(0)
    age: number;

    @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
    @IsOptional()
    @IsString()
    avatar?: string;
}
