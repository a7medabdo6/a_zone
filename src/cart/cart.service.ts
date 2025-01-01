import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CrudRequest, CrudService } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartService extends TypeOrmCrudService<Cart> {
  constructor(@InjectRepository(Cart) repo) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: any): Promise<Cart> {
    try {
      let category = new Cart();
      category = { ...dto };
      console.log(dto, 'dtodto');
      const res = await this.repo.save(category);
      return res;
      // const cart = this.repo.create({
      //   user: { id: dto.user?.id },
      //   cartItems: dto.cartItems.map((item) => ({
      //     product: { id: item.product },
      //     quantity: item.quantity,
      //   })),
      // });
      // return this.repo.save(cart);
    } catch (error) {
      console.log(error);

      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
