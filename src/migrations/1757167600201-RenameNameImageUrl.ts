import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameNameImageUrl1757167600201 implements MigrationInterface {
    name = 'RenameNameImageUrl1757167600201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Destinations\` CHANGE \`images\` \`image_url\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Destinations\` CHANGE \`image_url\` \`images\` text NOT NULL`);
    }

}
