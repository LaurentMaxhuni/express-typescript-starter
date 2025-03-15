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
    return await this.enrollmentRepository.getManyAndCount(resourceOptions);
  }

  public async create(data: object) {
    let enrollment = await this.enrollmentRepository.createEnrollment(data);

    return enrollment;
  }

  public async delete(enrollment_id: number) {
    const enrollment = await this.enrollmentRepository.findOne(enrollment_id);

    return await this.enrollmentRepository.deleteEnrollment(enrollment);
  }
}
