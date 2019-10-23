import { MigrationInterface, QueryRunner } from 'typeorm'

export class cart1571749256835 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "cart" ("cart_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" double precision NOT NULL DEFAULT 10, "total" double precision NOT NULL DEFAULT 10, "discounts" double precision NOT NULL DEFAULT 10, "tax" double precision NOT NULL DEFAULT 10, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c741cd2adcfb2f2d1c2743d76b6" PRIMARY KEY ("cart_id"))`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "cart"`)
  }
}
