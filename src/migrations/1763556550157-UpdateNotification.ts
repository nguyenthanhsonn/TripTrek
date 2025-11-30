import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNotification1763556550157 implements MigrationInterface {
    name = 'UpdateNotification1763556550157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD \`received_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`tour_id\` \`tour_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`booking_id\` \`booking_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_fe963f3984fd80d8fd16b247941\` FOREIGN KEY (\`received_id\`) REFERENCES \`Users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_fe963f3984fd80d8fd16b247941\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`booking_id\` \`booking_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`tour_id\` \`tour_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP COLUMN \`received_id\``);
    }

}
