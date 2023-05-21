import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { Desafioscherma } from './interfaces/desafios.schema';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { Partidascherma } from './interfaces/partidas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Desafio',
      schema: Desafioscherma
    }]),
    MongooseModule.forFeature([{
      name: 'Partida',
      schema: Partidascherma
    }]),
    JogadoresModule,
    CategoriasModule,
  ],
  controllers: [DesafiosController],
  providers: [
    DesafiosService,
    Model
  ],
})
export class DesafiosModule {}
