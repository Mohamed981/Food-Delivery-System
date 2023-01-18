import { MigrationInterface, QueryRunner } from "typeorm";

export class UserIsOwner1673773833557 implements MigrationInterface {
    name = 'UserIsOwner1673773833557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`IsOwner\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`IsOwner\``);
    }

}
