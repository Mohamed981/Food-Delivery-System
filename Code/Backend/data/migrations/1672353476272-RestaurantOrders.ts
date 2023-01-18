import { MigrationInterface, QueryRunner } from "typeorm";

export class RestaurantOrders1672353476272 implements MigrationInterface {
    name = 'RestaurantOrders1672353476272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`restaurantId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_c93f22720c77241d2476c07cabf\` FOREIGN KEY (\`restaurantId\`) REFERENCES \`restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_c93f22720c77241d2476c07cabf\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`restaurantId\``);
    }

}
