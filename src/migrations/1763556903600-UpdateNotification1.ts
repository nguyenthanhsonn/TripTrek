import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNotification11763556903600 implements MigrationInterface {
    name = 'UpdateNotification11763556903600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_4140c8b09ff58165daffbefbd7e\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_4140c8b09ff58165daffbefbd7e\` FOREIGN KEY (\`sender_id\`) REFERENCES \`Users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_4140c8b09ff58165daffbefbd7e\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_4140c8b09ff58165daffbefbd7e\` FOREIGN KEY (\`sender_id\`) REFERENCES \`Users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
