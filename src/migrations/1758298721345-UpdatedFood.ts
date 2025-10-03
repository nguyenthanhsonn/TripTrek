import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedFood1758298721345 implements MigrationInterface {
    name = 'UpdatedFood1758298721345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Food\` DROP COLUMN \`price\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Food\` ADD \`price\` int NOT NULL`);
    }

}
