import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { Service } from 'typedi';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';
import { GradeService } from '@base/api/services/Grades/GradeService';
import { GradeCreateRequest } from '@api/requests/Grades/GradeCreateRequest';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/courses')
@UseBefore(AuthCheck)
export class AssignmentController extends ControllerBase {
  public constructor(private gradeService: GradeService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.gradeService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.gradeService.findBasedOnAssigmnetId(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() course: GradeCreateRequest) {
    return await this.gradeService.create(course);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() course: any) {
    return await this.gradeService.updateOneById(id, course);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.gradeService.deleteOneById(id);
  }
}
