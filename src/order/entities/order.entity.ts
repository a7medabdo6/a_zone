// order/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => OrderItem, (OrderItem) => OrderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @Column({ default: false })
  pointsAdded: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;
}
