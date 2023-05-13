import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(
    private readonly jogadoresService: JogadoresService
  ){}

  @Post()
  async criarAtualizarJogador(
    @Body() criarJogadorDto: CriarJogadorDto
  ): Promise<Jogador> {
    return await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string
  ): Promise<Jogador[] | Jogador> {
    if(email) {
      return await this.jogadoresService.consultarJogadorPorEmail(email)
    }
    return await this.jogadoresService.consultarTodosJogadores()
  }

  @Delete()
  async deletarJogador(
    @Query('email') email: string
  ): Promise<String> {
    return await this.jogadoresService.deletarJogador(email)
  }

}
