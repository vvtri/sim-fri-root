import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstCommit1685372727155 implements MigrationInterface {
    name = 'FirstCommit1685372727155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."file_audience_type_enum" AS ENUM('ONLY_ME', 'FRIEND', 'PUBLIC')`);
        await queryRunner.query(`CREATE TYPE "public"."file_file_type_enum" AS ENUM('png', 'jpg', 'jpeg', 'pdf', 'mp3', 'mp4', 'wav', 'xlsx', 'xls', 'csv')`);
        await queryRunner.query(`CREATE TABLE "file" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" integer NOT NULL, "key" character varying(255) NOT NULL, "bucket" character varying(255) NOT NULL, "size" character varying NOT NULL DEFAULT '0', "audience_type" "public"."file_audience_type_enum" NOT NULL, "file_type" "public"."file_file_type_enum" NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('ACTIVE', 'UNVERIFIED')`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" integer NOT NULL, "status" "public"."user_status_enum" NOT NULL, "phone_number" character varying(50), "email" character varying(255), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_relationship_status_enum" AS ENUM('SINGLE', 'IN_RELATIONSHIP', 'MARRIED', 'SECRET')`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" integer NOT NULL, "address" character varying, "name" character varying, "birth_date" TIMESTAMP WITH TIME ZONE, "workplace" character varying, "school" character varying, "hometown" character varying, "relationship_status" "public"."user_profile_relationship_status_enum", "avatar_id" integer, "user_id" integer NOT NULL, CONSTRAINT "REL_3c011f4eefd39da06c16ace49a" UNIQUE ("avatar_id"), CONSTRAINT "REL_eee360f3bff24af1b689076520" UNIQUE ("user_id"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_516f1cf15166fd07b732b4b6ab0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_3c011f4eefd39da06c16ace49a2" FOREIGN KEY ("avatar_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_3c011f4eefd39da06c16ace49a2"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_516f1cf15166fd07b732b4b6ab0"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_relationship_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TYPE "public"."file_file_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."file_audience_type_enum"`);
    }

}
