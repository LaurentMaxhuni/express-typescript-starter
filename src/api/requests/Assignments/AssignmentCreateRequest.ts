import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsDate } from 'class-validator';

export class AssignmentCreateRequest {
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  assignment_name: string;

  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  assignment_description: string;

  @IsDate()
  date_assigned: Date;
}
