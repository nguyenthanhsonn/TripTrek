import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotification1763486400154 implements MigrationInterface {
    name = 'AddNotification1763486400154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`typeNoti\` enum ('NEW_BOOKING', 'BOOKING_STATUS', 'TOUR_APPROVED', 'TOUR_REJECTED', 'SYSTEM') NOT NULL, \`title\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`tour_id\` int NOT NULL, \`booking_id\` int NOT NULL, \`sender_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_4140c8b09ff58165daffbefbd7e\` FOREIGN KEY (\`sender_id\`) REFERENCES \`Users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_4140c8b09ff58165daffbefbd7e\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
    }

}
