import { Type } from 'class-transformer';
import { IsInt, IsDate } from 'class-validator';

export class GradeCreateRequest {
  @IsInt()
  grade: number;

  @IsDate()
  @Type(() => Date)
  date_graded: Date;
}
