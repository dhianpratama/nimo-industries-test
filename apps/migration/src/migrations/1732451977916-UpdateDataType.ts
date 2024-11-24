import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDataType1732451977916 implements MigrationInterface {
    name = 'UpdateDataType1732451977916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "search_histories" DROP COLUMN "result"`);
        await queryRunner.query(`ALTER TABLE "search_histories" ADD "result" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "search_histories" DROP COLUMN "result"`);
        await queryRunner.query(`ALTER TABLE "search_histories" ADD "result" integer NOT NULL`);
    }

}
