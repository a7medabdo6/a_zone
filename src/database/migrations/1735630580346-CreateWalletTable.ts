import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWalletTable1735630580346 implements MigrationInterface {
  name = 'CreateWalletTable1735630580346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_29e590514f9941296f3a2440d39"`,
    );
    await queryRunner.query(
      `CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "balance" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "timestamp" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD "coupon" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "pointsAdded" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "amount" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "walletId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_922e8c1d396025973ec81e2a402" UNIQUE ("walletId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_29e590514f9941296f3a2440d39" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_922e8c1d396025973ec81e2a402" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_922e8c1d396025973ec81e2a402"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_29e590514f9941296f3a2440d39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_922e8c1d396025973ec81e2a402"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "walletId"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "pointsAdded"`);
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "coupon"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TABLE "wallet"`);
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_29e590514f9941296f3a2440d39" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
