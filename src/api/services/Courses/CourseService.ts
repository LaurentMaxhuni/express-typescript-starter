import { Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CourseRepository } from '@base/api/repositories/Courses/CourseRepository';

@Service()
export class CourseService {
  constructor(@InjectRepository() private courseRepository: CourseRepository, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    //
  }

  public async viewCourses(resourceOptions: object) {
    const courses = await this.courseRepository.getManyAndCount(resourceOptions);
    return courses;
  }

  public async findOneById(course_id: number) {
    const course = await this.courseRepository.findOne(course_id);
    return course;
  }

  public async getAllStudentsBasedOnCourseId(course_id: number) {
    const course = await this.courseRepository.findOne(course_id, { relations: ['enrollments', 'enrollments.student'] });

    if (!course) {
      throw new Error('Course not found');
    }

    const students = course.enrollments.map((enrollment) => enrollment.student);
    return students;
  }

  public async create(data: object) {
    let course = await this.courseRepository.createCourse(data);

    return course;
  }

  public async deleteOneById(course_id: number) {
    return await this.courseRepository.delete(course_id);
  }
}
