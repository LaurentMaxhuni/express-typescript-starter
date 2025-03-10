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

  public async create(data: object) {
    let grade = await this.gradeRepository.createGrade(data);

    return grade;
  }

  public async updateOneById(assignment_id: number, data: object) {
    const grade = await this.gradeRepository.getOneById(assignment_id);

    return await this.gradeRepository.updateGrade(grade, data);
  }

  public async deleteOneById(assignment_id: number) {
    return await this.gradeRepository.delete(assignment_id);
  }

  private async getRequestedGradeOrFail(id: number, resourceOptions?: object) {
    let grade = await this.gradeRepository.getOneById(id, resourceOptions);

    if (!grade) {
      console.log('assignment does not exits', 404);
    }

    return grade;
  }
}