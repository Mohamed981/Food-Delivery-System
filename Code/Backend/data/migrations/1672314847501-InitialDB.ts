import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDB1672314847501 implements MigrationInterface {
    name = 'InitialDB1672314847501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`Username\` varchar(255) NOT NULL, \`Email\` varchar(255) NOT NULL, \`Password\` varchar(255) NOT NULL, \`Salt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`restaurant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`RestaurantName\` varchar(255) NOT NULL, \`Category\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_43ebcd49fca84c2fda8c077ac6\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ItemName\` varchar(255) NOT NULL, \`ItemPrice\` int NOT NULL, \`restaurantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ordered_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orderId\` int NULL, \`itemId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`Status\` varchar(255) NOT NULL, \`TotalPrice\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`restaurant\` ADD CONSTRAINT \`FK_43ebcd49fca84c2fda8c077ac68\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item\` ADD CONSTRAINT \`FK_ba67381e8e1e0801134f8a5c7b0\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordered_item\` ADD CONSTRAINT \`FK_d5144196f9ef94620707f9c11f1\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordered_item\` ADD CONSTRAINT \`FK_0bee3f1355e3824e2c893e872d6\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`ordered_item\` DROP FOREIGN KEY \`FK_0bee3f1355e3824e2c893e872d6\``);
        await queryRunner.query(`ALTER TABLE \`ordered_item\` DROP FOREIGN KEY \`FK_d5144196f9ef94620707f9c11f1\``);
        await queryRunner.query(`ALTER TABLE \`item\` DROP FOREIGN KEY \`FK_ba67381e8e1e0801134f8a5c7b0\``);
        await queryRunner.query(`ALTER TABLE \`restaurant\` DROP FOREIGN KEY \`FK_43ebcd49fca84c2fda8c077ac68\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`ordered_item\``);
        await queryRunner.query(`DROP TABLE \`item\``);
        await queryRunner.query(`DROP INDEX \`REL_43ebcd49fca84c2fda8c077ac6\` ON \`restaurant\``);
        await queryRunner.query(`DROP TABLE \`restaurant\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
