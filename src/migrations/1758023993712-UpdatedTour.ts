import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedTour1758023993712 implements MigrationInterface {
    name = 'UpdatedTour1758023993712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Tour\` ADD CONSTRAINT \`FK_ec368938d8028faf68403eab33f\` FOREIGN KEY (\`created_by_user\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Tour\` DROP FOREIGN KEY \`FK_ec368938d8028faf68403eab33f\``);
    }

}
