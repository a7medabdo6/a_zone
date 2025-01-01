import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCouponTable1735555441205 implements MigrationInterface {
  name = 'CreateCouponTable1735555441205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "coupon" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "discountPercentage" numeric NOT NULL, "expirationDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_coupons_coupon" ("productId" integer NOT NULL, "couponId" integer NOT NULL, CONSTRAINT "PK_961a111a286f3240f913bf106c7" PRIMARY KEY ("productId", "couponId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_01663a63e3278322248b82fdb5" ON "product_coupons_coupon" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_98f1160426c078b4fd1520b20c" ON "product_coupons_coupon" ("couponId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product_coupons_coupon" ADD CONSTRAINT "FK_01663a63e3278322248b82fdb58" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_coupons_coupon" ADD CONSTRAINT "FK_98f1160426c078b4fd1520b20c2" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_coupons_coupon" DROP CONSTRAINT "FK_98f1160426c078b4fd1520b20c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_coupons_coupon" DROP CONSTRAINT "FK_01663a63e3278322248b82fdb58"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_98f1160426c078b4fd1520b20c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_01663a63e3278322248b82fdb5"`,
    );
    await queryRunner.query(`DROP TABLE "product_coupons_coupon"`);
    await queryRunner.query(`DROP TABLE "coupon"`);
  }
}
