import { Service } from 'typedi';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { UserNotFoundException } from '@api/exceptions/Users/UserNotFoundException';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CourseRepository } from '@base/api/repositories/Courses/CourseRepository';

@Service()
export class CourseService {
  constructor(@InjectRepository() private courseRepository: CourseRepository, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.courseRepository.getManyAndCount(resourceOptions);
  }
  
  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedUserOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    let course = await this.courseRepository.createCourse(data);

    return course;
  }

  public async updateOneById(id: number, data: object) {
    const course = await this.getRequestedUserOrFail(id);

    return await this.courseRepository.updateCourse(course, data);
  }

  public async deleteOneById(id: number) {
    return await this.courseRepository.delete(id);
  }

  private async getRequestedUserOrFail(id: number, resourceOptions?: object) {
    let course = await this.courseRepository.getOneById(id, resourceOptions);

    if (!course) {
      console.log('course does not exits', 404);
    }

    return course;
  }
}
