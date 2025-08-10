import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSupportDto {
  @IsString()
  @MaxLength(80)
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @MaxLength(255)
  @IsOptional()
  email?: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  message: string;
}
