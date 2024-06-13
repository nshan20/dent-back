import type { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class addMigrationsForMedicalForm1718299917431
  implements MigrationInterface
{
  name = 'addMigrationsForMedicalForm1718299917431';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // eslint-disable-next-line max-len
      `CREATE TABLE "medical-forms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "last_name" character varying NOT NULL, "sur_name" character varying NOT NULL, "age" character varying NOT NULL, "phone_number" character varying NOT NULL, "description" character varying NOT NULL, "url_fail" character varying NOT NULL, "register_date" character varying NOT NULL, CONSTRAINT "PK_448ddc8a03495f0c89b508c2642" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "medical-forms"`);
  }
}
