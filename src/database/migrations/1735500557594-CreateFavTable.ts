import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFavTable1735500557594 implements MigrationInterface {
  name = 'CreateFavTable1735500557594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fav_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "favId" integer, "productId" integer, CONSTRAINT "PK_35a11e8488ad19b8b92063794b5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fav" ("id" SERIAL NOT NULL, CONSTRAINT "PK_5b599fa3e2db35e989237949af5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "favId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_5840d58bdecfa24c40b816eeb22" UNIQUE ("favId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_item" ADD CONSTRAINT "FK_a8a551405c3d4055b423bf06212" FOREIGN KEY ("favId") REFERENCES "fav"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_item" ADD CONSTRAINT "FK_c9b147c08c4744b558a0247727d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_5840d58bdecfa24c40b816eeb22" FOREIGN KEY ("favId") REFERENCES "fav"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_5840d58bdecfa24c40b816eeb22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_item" DROP CONSTRAINT "FK_c9b147c08c4744b558a0247727d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fav_item" DROP CONSTRAINT "FK_a8a551405c3d4055b423bf06212"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_5840d58bdecfa24c40b816eeb22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "favId"`);
    await queryRunner.query(`DROP TABLE "fav"`);
    await queryRunner.query(`DROP TABLE "fav_item"`);
  }
}
