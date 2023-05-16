import { Body, Controller, Delete, Get, Post, Put, Query, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from '../jogadores/pipes/jogadores-validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dto/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(
    private readonly jogadoresService: JogadoresService
  ){}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto)
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() criarJogadorDto: AtualizarJogadorDto,
    @Param('id', JogadoresValidacaoParametrosPipe) id: string
  ): Promise<Jogador | String> {
    return await this.jogadoresService.atualizarJogador(criarJogadorDto, id)
  }

  @Get()
  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores()
  }

  @Get(':id')
  async consultarJogadorPeloId(
    @Param('id', JogadoresValidacaoParametrosPipe) id: string
  ): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPeloId(id)
  }

  @Delete()
  async deletarJogador(
    @Query('id', JogadoresValidacaoParametrosPipe) id: string
  ): Promise<String> {
    return await this.jogadoresService.deletarJogador(id)
  }

}
