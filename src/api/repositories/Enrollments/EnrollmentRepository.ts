import { Enrollment } from '@api/models/Enrollments/Enrollment';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@EntityRepository(Enrollment)
export class EnrollmentRepository extends RepositoryBase<Enrollment> {
  public async createEnrollment(data: object) {
    let entity = new Enrollment();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateEnrollment(enrollment: Enrollment, data: object) {
    Object.assign(enrollment, data);

    return await enrollment.save(data);
  }
}
