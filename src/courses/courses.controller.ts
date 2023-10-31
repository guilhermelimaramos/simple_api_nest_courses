import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto'

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseSevice: CoursesService) {}

  @Get()
  findAll() {
    return this.courseSevice.findAll()
  }

  @Get(':id/')
  //findOne(@Param('id') id: string, @Param('name') name: string) {
  findOne(@Param('id') id: string) {
    return this.courseSevice.findOne(id);
  }

  @HttpCode(200)
  @Post()
  create(@Body() createCourseDTO: CreateCourseDTO) {
    const newCourse = this.courseSevice.create(createCourseDTO)
    return newCourse
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourseDTO) {
    return this.courseSevice.update(id, updateCourseDTO);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseSevice.remove(id);
  }
}
