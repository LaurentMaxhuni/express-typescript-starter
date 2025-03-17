import { Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { StudentRepository } from '@base/api/repositories/Students/StudentRepository';

@Service()
export class StudentService {
  constructor(
    @InjectRepository() private studentRepository: StudentRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    //
  }

  public async viewStudents(resourceOptions: object) {
    const students = await this.studentRepository.getManyAndCount(resourceOptions);
    return students;
  }

  public async findOneById(student_id: number) {
    const student = await this.studentRepository.findOne(student_id);
    return student;
  }

  public async getAllCoursesBasedOnStudentId(student_id: number) {
    const student = await this.studentRepository.findOne(student_id, { relations: ['enrollments', 'enrollments.course'] });

    if (!student) {
      throw new Error('Student not found');
    }

    const courses = student.enrollments.map((enrollment) => enrollment.course);
    return courses;
  }

  public async create(data: object) {
    let course = await this.studentRepository.createStudent(data);

    return course;
  }

  public async deleteOneById(student_id: number) {
    return await this.studentRepository.delete(student_id);
  }
}
