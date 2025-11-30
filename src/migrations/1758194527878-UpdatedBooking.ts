import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedBooking1758194527878 implements MigrationInterface {
    name = 'UpdatedBooking1758194527878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bookings\` ADD \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bookings\` DROP COLUMN \`created_at\``);
    }

}
