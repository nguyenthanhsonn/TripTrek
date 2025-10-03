import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTours1757353602271 implements MigrationInterface {
    name = 'CreateTours1757353602271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Tour\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` int NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`guid_name\` text NOT NULL, \`destination_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Tour\` ADD CONSTRAINT \`FK_fa813b1761386fb3740b382d2f8\` FOREIGN KEY (\`destination_id\`) REFERENCES \`Destinations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Tour\` DROP FOREIGN KEY \`FK_fa813b1761386fb3740b382d2f8\``);
        await queryRunner.query(`DROP TABLE \`Tour\``);
    }

}
