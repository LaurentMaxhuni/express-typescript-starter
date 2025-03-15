import { IsNotEmpty, IsString, MinLength, MaxLength, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CourseCreateRequest {
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  course_name: string;

  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  course_description: string;

  @IsDate()
  @Type(() => Date)
  created_at: Date;
}
