import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Course } from '../Courses/Course';

@Entity({ name: 'assignments' })
export class Assignment extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  assignment_name: string;

  @Column()
  assignment_description: string;

  @Column()
  course_id: number;

  @Column()
  date_assigned: Date;

  @ManyToOne(() => Course, course => course.assignment)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
