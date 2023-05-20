import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Query, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { AtualizarCategoriaDto } from 'src/Categorias/dto/atualizar-Categoria.dto';
import { CriarCategoriaDto } from 'src/Categorias/dto/criar-Categoria.dto';
import { Categoria } from 'src/Categorias/interfaces/Categoria.interface';
import { CategoriasService } from 'src/Categorias/Categorias.service';
import { CategoriasValidacaoParametrosPipe } from '../common/pipes/categoria-validacao-parametros.pipe';

@Controller('categorias')
export class CategoriasController {
    constructor(
        private readonly categoriasService: CategoriasService
      ){}
    
      @Post()
      @UsePipes(ValidationPipe)
      async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto
      ): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDto)
      }
    
      @Get()
      async consultarTodosCategorias(): Promise<Categoria[]> {
        return await this.categoriasService.consultarTodosCategorias()
      }
    
      @Get(':categoria')
      async consultarCategoriaPeloId(
        @Param('categoria', CategoriasValidacaoParametrosPipe) categoria: string
      ): Promise<Categoria> {
        return await this.categoriasService.consultarCategoriaPeloId(categoria)
      }

      @Put(':categoria')
      @UsePipes(ValidationPipe)
      async atualizarCategoria(
        @Body() criarCategoriaDto: AtualizarCategoriaDto,
        @Param('categoria', CategoriasValidacaoParametrosPipe) categoria: string
      ): Promise<Categoria | String> {
        return await this.categoriasService.atualizarCategoria(criarCategoriaDto, categoria)
      }

      @Post('/:categoria/jogadores/:idJogador')
      @UsePipes(ValidationPipe)
      async atribuirCategoriaJogador(
        @Param() params: String[]
      ): Promise<void> {
        return await this.categoriasService.atribuirCategoriaJogador(params)
      }
    
      @Delete()
      async deletarCategoria(
        @Query('id', CategoriasValidacaoParametrosPipe) id: string
      ): Promise<String> {
        return await this.categoriasService.deletarCategoria(id)
      }
    
}
