import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { AtualizarDesafioDto } from 'src/Desafios/dto/atualizar-Desafio.dto';
import { CriarDesafioDto } from 'src/Desafios/dto/criar-Desafio.dto';
import { DesafiosService } from 'src/Desafios/Desafios.service';
import { Desafio } from './interfaces/desafios.interface';
import { DesafiosValidacaoParametrosPipe } from 'src/common/pipes/desafio-validacao-parametros.pipe';
import { AtribuirDesafioPartidaDto } from './dto/atribuir-desafio-partida.dto';

@Controller('desafios')
export class DesafiosController {
  constructor(
      private readonly desafiosService: DesafiosService
    ){}
  
    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
      @Body() criarDesafioDto: CriarDesafioDto
    ): Promise<Desafio> {
      return await this.desafiosService.criarDesafio(criarDesafioDto)
    }
  
    @Get()
    async consultarTodosDesafios(): Promise<Desafio[]> {
      return await this.desafiosService.consultarTodosDesafios()
    }
  
    @Get(':desafio')
    async consultarDesafioDeUmJogador(
      @Param('desafio', DesafiosValidacaoParametrosPipe) id: string
    ): Promise<Desafio[]> {
      return await this.desafiosService.consultarDesafioDeUmJogador(id)
    }

    @Put(':desafio')
    @UsePipes(ValidationPipe)
    async atualizarDesafio(
      @Body() criarDesafioDto: AtualizarDesafioDto,
      @Param('desafio', DesafiosValidacaoParametrosPipe) id: string
    ): Promise<Desafio | String> {
      return await this.desafiosService.atualizarDesafio(criarDesafioDto, id)
    }

    @Post('/:desafio/:partida')
    @UsePipes(ValidationPipe)
    async atribuirDesafioPartida(
      @Body(ValidationPipe) atribuirDesafioPartida: AtribuirDesafioPartidaDto,
      @Param('desafio') id: String
    ): Promise<void> {
      return await this.desafiosService.atribuirDesafioPartida(id, atribuirDesafioPartida)
    }
  
    @Delete('id')
    async deletarDesafio(
      @Param('id') id: string
    ): Promise<String> {
      return await this.desafiosService.deletarDesafio(id)
    }
    
}
