import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedFood1758304380963 implements MigrationInterface {
    name = 'UpdatedFood1758304380963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Food\` ADD \`is_popular\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Food\` DROP COLUMN \`is_popular\``);
    }

}
