import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Enrollment } from '../Enrollments/Enrollment';

@Entity({ name: 'course' })
export class Course extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  course_id: number;

  @Column()
  course_title: string;

  @Column()
  course_description: string;

  @Column()
  created_at: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
