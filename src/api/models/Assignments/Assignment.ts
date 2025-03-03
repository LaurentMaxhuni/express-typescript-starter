import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Course } from '../Courses/Course';

@Entity({ name: 'assignments' })
export class Assignment extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  assignment_id: number;

  @Column()
  @IsNotEmpty()
  assignment_name: string;

  @Column()
  @IsNotEmpty()
  assignment_description: string;

  @Column()
  course_id: number;

  @Column()
  date_assigned: Date;

  @ManyToOne(() => Course, course => course.assignment)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
