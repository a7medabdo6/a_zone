import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinColumn,
  OneToOne,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { FileEntity } from '../../files/infrastructure/persistence/relational/entities/file.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Order } from '../../order/entities/order.entity';
import { Feature } from '../../feature/entities/feature.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  name_en: string;

  @Column({ nullable: true, default: null })
  name_ar: string;

  @Column({ nullable: true, default: null })
  minimum_nights: number;

  @Column({ nullable: true, default: null })
  price_per_night: number;
  @Column({ nullable: true, default: null })
  desc_en: string;
  @Column({ nullable: true, default: null })
  desc_ar: string;

  @Column({ nullable: true, default: null })
  working_hours_en: string;

  @Column({ nullable: true, default: null })
  working_hours_ar: string;

  @Column({ nullable: true, default: null })
  location_en: string;

  @Column({ nullable: true, default: null })
  location_ar: string;

  @Column({ nullable: true, default: null })
  map: string;

  @Column({ nullable: true, default: null })
  policy_en: string;
  @Column({ nullable: true, default: null })
  policy_ar: string;

  @Column({ nullable: true, default: null })
  terms_en: string;
  @Column({ nullable: true, default: null })
  terms_ar: string;

  @Column({ nullable: true, default: null })
  cancellation_policy_en: string;
  @Column({ nullable: true, default: null })
  cancellation_policy_ar: string;

  @Column({ nullable: true, default: true })
  is_new: boolean;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  photo?: FileEntity | null;

  @ManyToOne(() => UserEntity, (user) => user.products) // Many products belong to one user
  user: UserEntity;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @ManyToMany(() => Feature, (feature) => feature.products)
  features: Feature[];

  @ManyToMany(() => Coupon, (coupon) => coupon.products)
  @JoinTable()
  coupons: Coupon[];
}
