import { Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { EnrollmentRepository } from '@base/api/repositories/Enrollments/EnrollmentRepository';

@Service()
export class EnrollmentService {
  constructor(
    @InjectRepository() private enrollmentRepository: EnrollmentRepository,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    //
  }

  public async viewEnrollments(resourceOptions?: object) {
    return await this.enrollmentRepository.find({
      relations: ['student', 'course']
    })
  }

  public async create(data: object) {
    let enrollment = await this.enrollmentRepository.createEnrollment(data);

    return enrollment;
  }

  public async deleteOneById(enrollment_id: number) {
    return await this.enrollmentRepository.delete(enrollment_id);
  }
}
