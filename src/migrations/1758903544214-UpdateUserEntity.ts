import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1758903544214 implements MigrationInterface {
    name = 'UpdateUserEntity1758903544214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` DROP COLUMN \`full_name\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` ADD \`full_name\` varchar(255) NOT NULL`);
    }

}
