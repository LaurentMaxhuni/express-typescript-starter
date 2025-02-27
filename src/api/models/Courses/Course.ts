import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { User } from '../Users/User';

@Entity({ name: 'courses' })
export class Course extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  course_name: string;

  @Column()
  description: string;

  @Column()
  user_id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @OneToMany(() => User, (user) => user.id)
  user: User[];
}
