import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CourseCreateRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('int')
    duration: number;

    @Column()
    instructorId: string;
}