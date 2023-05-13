import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { JogadorScherma } from './interfaces/jogador.schema';
import { Model } from 'mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'jogadores',
      schema: JogadorScherma
    }])
  ],
  controllers: [JogadoresController],
  providers: [
    JogadoresService,
    Model
  ],
})
export class JogadoresModule {}
