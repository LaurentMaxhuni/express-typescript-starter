import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { Service } from 'typedi';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';
import { StudentService } from '@base/api/services/Students/StudentService';
import { StudentCreateRequest } from '@api/requests/Students/StudentCreateRequest';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/students')
@UseBefore(AuthCheck)
export class StudentController extends ControllerBase {
  public constructor(private studentService: StudentService) {
    super();
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() student: StudentCreateRequest) {

    if (student.created_at) {
      student.created_at = new Date(student.created_at);
    }
    
    return await this.studentService.create(student);
  }

  @Get('/:id([0-9]+)/courses')
  public async getAllCoursesBasedOnStudentId(@Param('id') id: number) {
    return await this.studentService.getAllCoursesBasedOnStudentId(id);
  }
}
