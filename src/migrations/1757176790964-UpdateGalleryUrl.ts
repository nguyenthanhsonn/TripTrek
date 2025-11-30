import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGalleryUrl1757176790964 implements MigrationInterface {
    name = 'UpdateGalleryUrl1757176790964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Destinations\` ADD \`gallery_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Destinations\` DROP COLUMN \`image_url\``);
        await queryRunner.query(`ALTER TABLE \`Destinations\` ADD \`image_url\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Destinations\` DROP COLUMN \`image_url\``);
        await queryRunner.query(`ALTER TABLE \`Destinations\` ADD \`image_url\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Destinations\` DROP COLUMN \`gallery_url\``);
    }

}
