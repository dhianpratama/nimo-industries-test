import { PasswordHelper } from "@nimo/common";
import { MigrationInterface, QueryRunner } from "typeorm";

const email = 'admin@mail.com';
const password = 'admin';

export class DefaultUser1732024155808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public.users (id, email, "password", created_at, updated_at) VALUES(uuid_generate_v4(), '${email}', '${await PasswordHelper.hashPassword(password)}', now(), now());`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public.users WHERE email='${email}'`)
    }

}
