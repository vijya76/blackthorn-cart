import { MigrationInterface, QueryRunner } from 'typeorm'

export class addedColumnsItem1571832623908 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "item" ADD "tax" double precision NOT NULL DEFAULT 0`)
    await queryRunner.query(`ALTER TABLE "item" ADD "discount" double precision NOT NULL DEFAULT 0`)
    await queryRunner.query(`ALTER TABLE "item" ADD "quantity" double precision NOT NULL DEFAULT 1`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "quantity"`)
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "discount"`)
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "tax"`)
  }
}
