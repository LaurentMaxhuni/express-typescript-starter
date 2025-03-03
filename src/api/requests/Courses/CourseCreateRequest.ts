import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsDate } from 'class-validator';

export class CourseCreateRequest {
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  course_name: string;

  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;
}
