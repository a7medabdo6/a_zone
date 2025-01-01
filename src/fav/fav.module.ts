import { Module } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavController } from './fav.controller';
import { Fav } from './entities/fav.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavItem } from './entities/fav-item.entity';
import { favEndUserController } from './favEndUser.controller';

@Module({
  controllers: [favEndUserController, FavController],
  providers: [FavService],
  imports: [
    TypeOrmModule.forFeature([Fav]),
    TypeOrmModule.forFeature([FavItem]),
  ],
})
export class FavModule {}
