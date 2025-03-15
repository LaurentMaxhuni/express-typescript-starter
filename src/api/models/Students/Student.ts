import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Enrollment } from '../Enrollments/Enrollment';
import { Type } from 'class-transformer';

@Entity({ name: 'student' })
export class Student extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  student_id: number;

  @Column()
  student_name: string;

  @Column()
  student_email: string;

  @Column()
  @Type(() => Date)
  created_at: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
