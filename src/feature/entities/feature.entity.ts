import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  name_en: string;

  @Column({ nullable: true, default: null })
  name_ar: string;

  @Column({ nullable: true, default: null })
  icon: string;

  @ManyToMany(() => Product, (Product) => Product.features)
  @JoinTable({ name: 'feature_product' })
  products: Product[];
}
