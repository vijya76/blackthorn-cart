import { MigrationInterface, QueryRunner } from 'typeorm'

export class order1571988538904 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "order" ("order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cart_id" uuid NOT NULL, "subtotal" double precision NOT NULL DEFAULT 0, "total" double precision NOT NULL DEFAULT 0, "discounts" double precision NOT NULL DEFAULT 0, "tax" double precision NOT NULL DEFAULT 0, "items" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_58998c5eaeaacdd004dec8b5d86" PRIMARY KEY ("order_id"))`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "order"`)
  }
}
