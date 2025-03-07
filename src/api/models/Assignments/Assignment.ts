import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Course } from '../Courses/Course';

@Entity({ name: 'assignments' })
export class Assignment extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  assignment_id: number;

  @Column()
  assignment_name: string;

  @Column()
  assignment_description: string;

  @Column()
  course_id: number;

  @Column()
  date_assigned: Date;

  // @ManyToOne(() => Course, course => course.assignment)
  // course: Course;
}
