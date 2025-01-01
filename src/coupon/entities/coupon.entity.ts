import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column('decimal')
  discountPercentage: number; // Discount in percentage (e.g., 20%)

  @ManyToMany(() => Product, (product) => product.coupons)
  products: Product[];

  @Column('timestamp')
  expirationDate: Date;
}
