import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedByUser1721154967894 implements MigrationInterface {
  name = 'updatedByUser1721154967894';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_translations" ADD "created_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_translations" ADD "updated_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "created_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "updated_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD "created_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD "updated_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "calendars" ADD "created_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "calendars" ADD "updated_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ADD "created_by" character varying DEFAULT CURRENT_USER`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" ADD "updated_by" character varying DEFAULT CURRENT_USER`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical-forms" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical-forms" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(`ALTER TABLE "calendars" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "calendars" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "post_translations" DROP COLUMN "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_translations" DROP COLUMN "created_by"`,
    );
  }
}
