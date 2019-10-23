import { MigrationInterface, QueryRunner } from 'typeorm'

export class addedRelationItemCategory1571815272402 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "item_categories_category" ("itemItemId" uuid NOT NULL, "categoryCategoryId" uuid NOT NULL, CONSTRAINT "PK_21d3b374e48824c29a607eb796c" PRIMARY KEY ("itemItemId", "categoryCategoryId"))`)
    await queryRunner.query(`ALTER TABLE "item_categories_category" ADD CONSTRAINT "FK_8c7f5329cea349743969ce712e6" FOREIGN KEY ("itemItemId") REFERENCES "item"("item_id") ON DELETE CASCADE`)
    await queryRunner.query(`ALTER TABLE "item_categories_category" ADD CONSTRAINT "FK_98a53e7fa936a3afec3d36671c8" FOREIGN KEY ("categoryCategoryId") REFERENCES "category"("category_id") ON DELETE CASCADE`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "item_categories_category" DROP CONSTRAINT "FK_98a53e7fa936a3afec3d36671c8"`)
    await queryRunner.query(`ALTER TABLE "item_categories_category" DROP CONSTRAINT "FK_8c7f5329cea349743969ce712e6"`)
    await queryRunner.query(`DROP TABLE "item_categories_category"`)
  }
}
