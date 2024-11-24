import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1731999201157 implements MigrationInterface {
    name = 'InitDB1731999201157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "search_histories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "searchQuery" character varying NOT NULL, "result" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_55eb6ed37ed8a334b599b3dfe66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "search_histories" ADD CONSTRAINT "FK_bbe77df2112da0baf6bc31de5aa" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "search_histories" DROP CONSTRAINT "FK_bbe77df2112da0baf6bc31de5aa"`);
        await queryRunner.query(`DROP TABLE "search_histories"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
