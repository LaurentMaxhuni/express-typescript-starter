import { JsonController, Post, Body, HttpCode, UseBefore, Get, QueryParams, Delete, Param } from 'routing-controllers';
import { Service } from 'typedi';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';
import { EnrollmentService } from '@base/api/services/Enrollments/EnrollmentService';
import { StudentService } from '@base/api/services/Students/StudentService';
import { CourseService } from '@base/api/services/Courses/CourseService';
import { EnrollmentCreateRequest } from '@api/requests/Enrollments/EnrollmentCreateRequest';
import { RequestQueryParser } from 'typeorm-simple-query-parser';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/enrollments')
@UseBefore(AuthCheck)
export class EnrollmentController extends ControllerBase {
  public constructor(private enrollmentService: EnrollmentService, private studentService: StudentService, private courseService: CourseService) {
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

    if(enrollment.student_id) {
      const checkStudent = await this.studentService.findOneById(enrollment.student_id);
      if(!checkStudent) {
        throw new Error('Student ID not found!');
      }
    } else if (enrollment.course_id) {
      const checkCourse = await this.courseService.findOneById(enrollment.student_id);
      if(!checkCourse) {
        throw new Error('Course ID not found!');
      }
    } else {
      throw new Error('Student ID and Course ID is required!');
    }
    
    // if(enrollment.student_id && enrollment.course_id) {
    //   const enrollmentExists = await this.enrollmentService.viewEnrollments({where: {student_id: enrollment.student_id, course_id: enrollment.course_id}});
    //   if(enrollmentExists.rows.length > 0) {
    //     throw new Error('Enrollment already exists!');
    //   }
    // }

    if (enrollment.enrolled_at) {
      enrollment.enrolled_at = new Date(enrollment.enrolled_at);
    }

    return await this.enrollmentService.create(enrollment);
  }
}
