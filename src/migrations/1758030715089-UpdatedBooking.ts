import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedBooking1758030715089 implements MigrationInterface {
    name = 'UpdatedBooking1758030715089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bookings\` DROP COLUMN \`price\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bookings\` ADD \`price\` int NOT NULL`);
    }

}
