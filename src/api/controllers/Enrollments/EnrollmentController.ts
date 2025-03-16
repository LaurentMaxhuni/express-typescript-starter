import { JsonController, Post, Body, HttpCode, UseBefore, Get, QueryParams, Delete, Param } from 'routing-controllers';
import { Service } from 'typedi';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';
import { EnrollmentService } from '@base/api/services/Enrollments/EnrollmentService';
import { EnrollmentCreateRequest } from '@api/requests/Enrollments/EnrollmentCreateRequest';
import { RequestQueryParser } from 'typeorm-simple-query-parser';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/enrollments')
@UseBefore(AuthCheck)
export class EnrollmentController extends ControllerBase {
  public constructor(private enrollmentService: EnrollmentService) {
    super();
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.enrollmentService.deleteOneById(id);
  }

  @Get()
  public async viewEnrollments(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();
    return await this.enrollmentService.viewEnrollments(resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async createEnrollment(@Body() enrollment: EnrollmentCreateRequest) {
    if (enrollment.enrolled_at) {
      enrollment.enrolled_at = new Date(enrollment.enrolled_at);
    }
    return await this.enrollmentService.create(enrollment);
  }
}
