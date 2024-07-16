import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeNullable1721153293486 implements MigrationInterface {
  name = 'makeNullable1721153293486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "last_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "sur_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "age" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "phone_number" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "url_fail" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "register_date" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "register_date" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "url_fail" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "phone_number" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "age" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "sur_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "last_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ALTER COLUMN "name" SET NOT NULL`,
    );
  }
}
