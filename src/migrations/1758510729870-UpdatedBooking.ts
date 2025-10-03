import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedBooking1758510729870 implements MigrationInterface {
    name = 'UpdatedBooking1758510729870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bookings\` CHANGE \`status\` \`status\` enum ('PENDING', 'SUCCESS', 'DENY') NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bookings\` CHANGE \`status\` \`status\` enum ('PENDING', 'CONFIRMED', 'cancel_req', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING'`);
    }

}
