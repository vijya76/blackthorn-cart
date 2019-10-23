import { MigrationInterface, QueryRunner } from 'typeorm'

export class stock1571747932063 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "stock" ("stock_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "count" double precision NOT NULL DEFAULT 10, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "itemItemId" uuid, CONSTRAINT "REL_e815e9767be2c454566c3dd772" UNIQUE ("itemItemId"), CONSTRAINT "PK_535f28fb720127de0997a5a866e" PRIMARY KEY ("stock_id"))`)
    await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_e815e9767be2c454566c3dd7722" FOREIGN KEY ("itemItemId") REFERENCES "item"("item_id")`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_e815e9767be2c454566c3dd7722"`)
    await queryRunner.query(`DROP TABLE "stock"`)
  }
}
