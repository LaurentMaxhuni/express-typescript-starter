// import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
// import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
// import { Assignment } from '../Assignments/Assignment';
// import { User } from '../Users/User';

// @Entity({ name: 'grades' })
// export class Grade extends EntityBase {
//   @PrimaryGeneratedColumn('increment')
//   grade_id: number;

//   @Column()
//   user_id: number;

//   @Column()
//   assignment_id: number;

//   @Column()
//   grade: number;

//   @Column()
//   date_graded: Date;

//   @ManyToMany(() => User, (user) => user.user_id)
//   user: User;

//   @ManyToMany(() => Assignment, (assignment) => assignment.assignment_id)
//   assignment: Assignment;
// }