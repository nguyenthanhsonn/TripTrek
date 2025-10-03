import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedUserEntity1758800564106 implements MigrationInterface {
    name = 'UpdatedUserEntity1758800564106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` ADD \`full_name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` DROP COLUMN \`full_name\``);
    }

}
