import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNotification21763557317471 implements MigrationInterface {
    name = 'UpdateNotification21763557317471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD \`is_read\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP COLUMN \`is_read\``);
    }

}
