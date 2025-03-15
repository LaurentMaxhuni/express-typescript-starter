import { Param, Get, JsonController, Post, Body, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { Service } from 'typedi';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';
import { CourseService } from '@base/api/services/Courses/CourseService';
import { CourseCreateRequest } from '@api/requests/Courses/CourseCreateRequest';

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

  @Post()
  @HttpCode(201)
  public async create(@Body() course: CourseCreateRequest) {
    return await this.courseService.create(course);
  }

  @Get("/:id([0-9]+)/students")
  public async getAllStudentsBasedOnCourseId(@Param('id') id: number) {
    return await this.courseService.getAllStudentsBasedOnCourseId(id);
  }   
}
