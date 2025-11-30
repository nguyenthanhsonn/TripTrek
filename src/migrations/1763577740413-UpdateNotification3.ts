import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNotification31763577740413 implements MigrationInterface {
    name = 'UpdateNotification31763577740413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP COLUMN \`createdAt\``);
    }

}
