import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteDataDestination1757207844490 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE \`Destinations\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
