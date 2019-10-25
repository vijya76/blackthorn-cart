import { MigrationInterface, QueryRunner } from 'typeorm'

export class orders1571999776179 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "orders" ("order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cart_id" uuid NOT NULL, "subtotal" double precision NOT NULL DEFAULT 0, "total" double precision NOT NULL DEFAULT 0, "discounts" double precision NOT NULL DEFAULT 0, "tax" double precision NOT NULL DEFAULT 0, "items" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "orders"`)
  }
}
