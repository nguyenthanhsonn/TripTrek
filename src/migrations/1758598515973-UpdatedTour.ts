import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedTour1758598515973 implements MigrationInterface {
    name = 'UpdatedTour1758598515973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Tour\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Tour\` DROP COLUMN \`is_deleted\``);
    }

}
