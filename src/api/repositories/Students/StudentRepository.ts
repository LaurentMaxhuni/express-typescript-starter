import { Student } from '@api/models/Students/Student';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@EntityRepository(Student)
export class StudentRepository extends RepositoryBase<Student> {
  public async createStudent(data: object) {
    let entity = new Student();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateStudent(student: Student, data: object) {
    Object.assign(student, data);

    return await student.save(data);
  }
}
