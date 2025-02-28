import { Assignment } from '@api/models/Assignments/Assignment';
import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@EntityRepository(Assignment)
export class AssignmentRepository extends RepositoryBase<Assignment> {
  public async createAssignment(data: object) {
    let entity = new Assignment();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateAssignment(assignment: Assignment, data: object) {
    Object.assign(assignment, data);

    return await assignment.save(data);
  }
}
