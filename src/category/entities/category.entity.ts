import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { FileEntity } from '../../files/infrastructure/persistence/relational/entities/file.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  name_en: string;

  @Column({ nullable: true, default: null })
  name_ar: string;

  @ManyToMany(() => Product, (Product) => Product.categories)
  @JoinTable()
  products: Product[];

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  photo?: FileEntity | null;
}
