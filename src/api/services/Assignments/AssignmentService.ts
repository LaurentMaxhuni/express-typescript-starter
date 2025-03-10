import { Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CourseRepository } from '@base/api/repositories/Courses/CourseRepository';
import { AssignmentRepository } from '@base/api/repositories/Assignments/AssignmentRepository';

@Service()
export class AssignmentService {
  constructor(@InjectRepository() private assignmentRepository: AssignmentRepository, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.assignmentRepository.getManyAndCount(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedAssignmentOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    let course = await this.assignmentRepository.createAssignment(data);

    return course;
  }

  public async updateOneById(id: number, data: object) {
    const course = await this.getRequestedAssignmentOrFail(id);

    return await this.assignmentRepository.updateAssignment(course, data);
  }

  public async deleteOneById(id: number) {
    return await this.assignmentRepository.delete(id);
  }

  private async getRequestedAssignmentOrFail(id: number, resourceOptions?: object) {
    let assignment = await this.assignmentRepository.getOneById(id, resourceOptions);

    if (!assignment) {
      console.log('assignment does not exits', 404);
    }

    return assignment;
  }
}
