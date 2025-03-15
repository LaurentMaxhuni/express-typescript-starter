import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { Student } from '@base/api/models/Students/Student';
import { Course } from '@base/api/models/Courses/Course';
import { Type } from 'class-transformer';

@Entity({ name: 'enrollments' })
export class Enrollment extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  enrollment_id: number;

  @Column()
  student_id: number;

  @Column()
  course_id: number;

  @Column()
  @Type(() => Date)
  enrolled_at: Date;

  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
