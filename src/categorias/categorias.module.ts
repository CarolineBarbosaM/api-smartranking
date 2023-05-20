import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaScherma } from './interfaces/categoria.schema';
import { Model } from 'mongoose';
import { JogadoresModule } from 'src/jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'categorias',
      schema: CategoriaScherma
    }]),
    JogadoresModule,
  ],
  controllers: [CategoriasController],
  providers: [
    CategoriasService,
    Model
  ],
})
export class CategoriasModule {}
