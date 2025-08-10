import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @MaxLength(155)
  @IsNotEmpty()
  question: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  answer: string;
}
