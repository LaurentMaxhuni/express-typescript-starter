import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsEmail } from 'class-validator';

export class StudentCreateRequest {
  @IsString()
  @IsNotEmpty()
  student_name: string;

  @IsEmail()
  @IsNotEmpty()
  student_email: string;

  @IsDate()
  @Type(() => Date)
  created_at: Date;
}
