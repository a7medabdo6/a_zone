import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { FavItem } from './fav-item.entity';

@Entity()
export class Fav {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.fav)
  user: UserEntity;

  @OneToMany(() => FavItem, (favItem) => favItem.fav, { cascade: true })
  favItems: FavItem[];
}
