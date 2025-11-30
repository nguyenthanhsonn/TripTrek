import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedDestination1757756881289 implements MigrationInterface {
    name = 'UpdatedDestination1757756881289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Reviews\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` int NOT NULL, \`comment\` varchar(255) NOT NULL, \`createdAt\` date NOT NULL, \`user_id\` int NULL, \`food_id\` int NULL, \`tour_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Food\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` int NOT NULL, \`destination_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Bookings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NULL, \`tour_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Image_Foods\` (\`id\` int NOT NULL AUTO_INCREMENT, \`food_id\` int NOT NULL, \`images\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Reviews\` ADD CONSTRAINT \`FK_4b56c617d51647bf5bd65e5b10e\` FOREIGN KEY (\`user_id\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Reviews\` ADD CONSTRAINT \`FK_a138e91d6309b821a5cff8abd21\` FOREIGN KEY (\`food_id\`) REFERENCES \`Food\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Reviews\` ADD CONSTRAINT \`FK_1f023e16559d1755906cfd14d3b\` FOREIGN KEY (\`tour_id\`) REFERENCES \`Tour\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Food\` ADD CONSTRAINT \`FK_67cd831390d57007ad15cb2a85f\` FOREIGN KEY (\`destination_id\`) REFERENCES \`Destinations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Bookings\` ADD CONSTRAINT \`FK_166b5b6744f61047dc35935a057\` FOREIGN KEY (\`user_id\`) REFERENCES \`Users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Bookings\` ADD CONSTRAINT \`FK_0a024de327389bdd03f956982bf\` FOREIGN KEY (\`tour_id\`) REFERENCES \`Tour\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bookings\` DROP FOREIGN KEY \`FK_0a024de327389bdd03f956982bf\``);
        await queryRunner.query(`ALTER TABLE \`Bookings\` DROP FOREIGN KEY \`FK_166b5b6744f61047dc35935a057\``);
        await queryRunner.query(`ALTER TABLE \`Food\` DROP FOREIGN KEY \`FK_67cd831390d57007ad15cb2a85f\``);
        await queryRunner.query(`ALTER TABLE \`Reviews\` DROP FOREIGN KEY \`FK_1f023e16559d1755906cfd14d3b\``);
        await queryRunner.query(`ALTER TABLE \`Reviews\` DROP FOREIGN KEY \`FK_a138e91d6309b821a5cff8abd21\``);
        await queryRunner.query(`ALTER TABLE \`Reviews\` DROP FOREIGN KEY \`FK_4b56c617d51647bf5bd65e5b10e\``);
        await queryRunner.query(`DROP TABLE \`Image_Foods\``);
        await queryRunner.query(`DROP TABLE \`Bookings\``);
        await queryRunner.query(`DROP TABLE \`Food\``);
        await queryRunner.query(`DROP TABLE \`Reviews\``);
    }

}
