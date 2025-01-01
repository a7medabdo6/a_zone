import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  Column,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Fav } from './fav.entity';

@Entity()
export class FavItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fav, (fav) => fav.favItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  fav: Fav;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;
}
