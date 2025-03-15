// import { Grade } from '@api/models/Grades/Grade';
// import { EntityRepository } from 'typeorm';
// import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

// @EntityRepository(Grade)
// export class GradeRepository extends RepositoryBase<Grade> {
//   public async createGrade(data: object) {
//     let entity = new Grade();

//     Object.assign(entity, data);

//     return await this.save(entity);
//   }

//   public async updateGrade(grade: Grade, data: object) {
//     Object.assign(grade, data);

//     return await grade.save(data);
//   }
// }
