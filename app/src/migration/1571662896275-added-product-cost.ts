import { MigrationInterface, QueryRunner } from 'typeorm'

export class addedProductCost1571662896275 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "product" ADD "cost" double precision NOT NULL DEFAULT 10`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cost"`)
  }
}
