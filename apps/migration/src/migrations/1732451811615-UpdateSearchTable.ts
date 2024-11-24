import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSearchTable1732451811615 implements MigrationInterface {
    name = 'UpdateSearchTable1732451811615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "search_histories" ADD "status" character varying`);
        await queryRunner.query(`ALTER TABLE "search_histories" DROP COLUMN "result"`);
        await queryRunner.query(`ALTER TABLE "search_histories" ADD "result" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "search_histories" DROP COLUMN "result"`);
        await queryRunner.query(`ALTER TABLE "search_histories" ADD "result" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "search_histories" DROP COLUMN "status"`);
    }

}
