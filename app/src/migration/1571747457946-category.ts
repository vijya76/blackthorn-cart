import { MigrationInterface, QueryRunner } from 'typeorm'

export class category1571747457946 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "category" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "taxes" double precision NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "category"`)
  }
}
