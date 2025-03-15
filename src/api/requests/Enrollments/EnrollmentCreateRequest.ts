import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class EnrollmentCreateRequest {
  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @IsDate()
  @Type(() => Date)
  enrolled_at: Date;
}