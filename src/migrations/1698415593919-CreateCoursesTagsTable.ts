import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCoursesTagsTable1698415593919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'courses_tags_tags',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses_tags')
    }

}
