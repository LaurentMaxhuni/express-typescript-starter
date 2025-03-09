import { Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { GradeRepository } from '@base/api/repositories/Grades/GradeRepository';

@Service()
export class GradeService {
  constructor(@InjectRepository() private gradeRepository: GradeRepository, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.gradeRepository.getManyAndCount(resourceOptions);
  }

  public async findBasedOnAssigmnetId(assignment_id: number, resourceOptions?: object) {
    return await this.gradeRepository.getOneById(assignment_id, resourceOptions);
  }
}