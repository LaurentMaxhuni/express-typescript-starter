import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { UserService } from '@api/services/Users/UserService';
import { Service } from 'typedi';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { UserUpdateRequest } from '@api/requests/Users/UserUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';
import { LoggedUser } from '@base/decorators/LoggedUser';
import { LoggedUserInterface } from '@api/interfaces/users/LoggedUserInterface';
import { CourseService } from '@base/api/services/Courses/CourseService';
import { CourseCreateRequest } from '@api/requests/Courses/CourseCreateRequest';
import { parse } from 'path';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/courses')
@UseBefore(AuthCheck)
export class CourseController extends ControllerBase {
  public constructor(private courseService: CourseService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.courseService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.courseService.findOneById(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() course: CourseCreateRequest) {
    return await this.courseService.create(course);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() course: any) {
    return await this.courseService.updateOneById(id, course);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.courseService.deleteOneById(id);
  }
}
