import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  
  
  // Index
  async findAll() {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  // Show
  async findOne(id: string) {
    const course =  await this.courseRepository.findOne({
      where: { id },
      relations: ['tags']
    })
    
    if (!course) {
      // throw new HttpException(`Course ID ${id} not found!`, 404)
      throw new NotFoundException(`Course ID ${id} not found!`)
    }
    return course
  }

  // Post
  async create(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map(name => this.preloadTagByName(name))
    );
  
    const newCourse = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });
    return this.courseRepository.save(newCourse);
  }


  // Put
  async update(id: string, updateCourseDTO: UpdateCourseDTO) {
    const tags = 
    updateCourseDTO.tags && 
    (await Promise.all(
      updateCourseDTO.tags.map(name => this.preloadTagByName(name))
    ));


    const existingCourse = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
      tags,
    })

    if (!existingCourse) throw new NotFoundException(`Course with ID ${id} not found!`)

    return this.courseRepository.save(existingCourse)
  }

  // Delete
  async remove(id: string) {
    const removeCourse = await this.courseRepository.findOne({
      where: {
        id
      }
    })
    if (!removeCourse) throw new NotFoundException(`Course ID ${id} not found!`)
    return this.courseRepository.remove(removeCourse)
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: {
        name
      }
    })

    if (tag) return tag

    return this.tagRepository.create({ name })
  }
}
