import { MigrationInterface, QueryRunner } from 'typeorm'

export class addedRelationCartItem1571815833165 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "cart_items_item" ("cartCartId" uuid NOT NULL, "itemItemId" uuid NOT NULL, CONSTRAINT "PK_d4412419d88451c800d32d68594" PRIMARY KEY ("cartCartId", "itemItemId"))`)
    await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "subtotal" SET DEFAULT 0`)
    await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "total" SET DEFAULT 0`)
    await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "discounts" SET DEFAULT 0`)
    await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "tax" SET DEFAULT 0`)
    await queryRunner.query(`ALTER TABLE "cart_items_item" ADD CONSTRAINT "FK_487ad5492699c9970d4429b23f5" FOREIGN KEY ("cartCartId") REFERENCES "cart"("cart_id") ON DELETE CASCADE`)
    await queryRunner.query(`ALTER TABLE "cart_items_item" ADD CONSTRAINT "FK_f66ae8c137ac0a439f496f6cf00" FOREIGN KEY ("itemItemId") REFERENCES "item"("item_id") ON DELETE CASCADE`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "cart_items_item" DROP CONSTRAINT "FK_f66ae8c137ac0a439f496f6cf00"`)
    await queryRunner.query(`ALTER TABLE "cart_items_item" DROP CONSTRAINT "FK_487ad5492699c9970d4429b23f5"`)
    await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "tax" SET DEFAULT 10`)
    await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "discounts" SET DEFAULT 10`)
    await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "total" SET DEFAULT 10`)
    await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "subtotal" SET DEFAULT 10`)
    await queryRunner.query(`DROP TABLE "cart_items_item"`)
  }
}
