import { randomUUID } from "node:crypto";
import { CoursesService } from "./courses.service";
import { Timestamp } from "typeorm";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { UpdateCourseDTO } from "./dto/update-course.dto";

describe("CoursesService unit test", () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectOutPutTags: any[];
  let expectOutPutCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    created_at = new Date();
    expectOutPutTags = [
      {
        id,
        name: "nestjs",
        created_at: created_at,
      },
    ];

    expectOutPutCourses = {
      id,
      name: "Teste",
      description: "Test description",
      created_at,
      tags: expectOutPutTags,
    };

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      proload: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
    };

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutPutTags)),
      findOne: jest.fn(),
    };
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a course", async () => {
    // @ts-expect-error defined part of methods
    service["courseRepository"] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service["tagRepository"] = mockTagRepository;

    const createCourseDTO: CreateCourseDTO = {
      name: "Teste",
      description: "Test description",
      tags: ["nestjs"],
    };

    const newCourses = await service.create(createCourseDTO);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(newCourses);
  });

  it("should list all course", async () => {
    // @ts-expect-error defined part of methods
    service["courseRepository"] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service["tagRepository"] = mockTagRepository;

    const courses = await service.findAll();
    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(courses);
  });

  it("should gets course by id", async () => {
    // @ts-expect-error defined part of methods
    service["courseRepository"] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service["tagRepository"] = mockTagRepository;

    const course = await service.findOne(id);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(course);
  });

  it("should gets course by id", async () => {
    // @ts-expect-error defined part of methods
    service["courseRepository"] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service["tagRepository"] = mockTagRepository;

    const course = await service.findOne(id);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(course);
  });

  it("should update a course", async () => {
    // @ts-expect-error defined part of methods
    service["courseRepository"] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service["tagRepository"] = mockTagRepository;

    const updateCourseDTO: UpdateCourseDTO = {
      name: "Teste",
      description: "Test description",
      tags: ["nestjs"],
    };

    const courseUpdate = await service.update(id, updateCourseDTO);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(mockCourseRepository.preload).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(courseUpdate);
  });

  it("should delete a course", async () => {
    // @ts-expect-error defined part of methods
    service["courseRepository"] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service["tagRepository"] = mockTagRepository;

    const courseUpdate = await service.remove(id);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutPutCourses).toStrictEqual(courseUpdate);
  });
});
