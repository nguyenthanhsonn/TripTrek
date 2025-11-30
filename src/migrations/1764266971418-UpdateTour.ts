import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTour1764266971418 implements MigrationInterface {
    name = 'UpdateTour1764266971418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Kiểm tra xem column đã tồn tại chưa
        const table = await queryRunner.getTable('Tour');
        const hasCreatedAt = table?.findColumnByName('created_at');
        const hasCreatedDashAt = table?.findColumnByName('created-at');
        
        if (hasCreatedDashAt && !hasCreatedAt) {
            // Nếu có created-at, đổi tên thành created_at
            await queryRunner.query(`ALTER TABLE \`Tour\` CHANGE \`created-at\` \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        } else if (!hasCreatedAt) {
            // Nếu chưa có, thêm mới
            await queryRunner.query(`ALTER TABLE \`Tour\` ADD \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Tour\` DROP COLUMN \`created_at\``);
    }

}
