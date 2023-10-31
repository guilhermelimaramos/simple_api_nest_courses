import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1698409189772 } from '../migrations/1698409189772-CreateCoursesTable'
import { CreateTagsTable1698412917436 } from '../migrations/1698412917436-CreateTagsTable'
import { CreateCoursesTagsTable1698415593919 } from "src/migrations/1698415593919-CreateCoursesTagsTable";
import { AddCourseIdToCourseTagsTable1698418935724 } from "src/migrations/1698418935724-AddCourseIdToCourseTagsTable";
import { AddTagsIdToCourseTagsTable1698420179378 } from "src/migrations/1698420179378-AddTagsIdToCourseTagsTable";
import { Course } from "src/courses/entities/courses.entity";
import { Tag } from "src/courses/entities/tags.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [Course, Tag],
  synchronize: false,
}

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1698409189772, 
    CreateTagsTable1698412917436, 
    CreateCoursesTagsTable1698415593919,
    AddCourseIdToCourseTagsTable1698418935724,
    AddTagsIdToCourseTagsTable1698420179378,
  ]
})