import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedReviews1757782979829 implements MigrationInterface {
    name = 'UpdatedReviews1757782979829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Reviews\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Reviews\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
    }

}
