import { JogadoresService } from './../jogadores/jogadores.service';
import { 
    Injectable,
    NotFoundException, 
    BadRequestException, 
    Inject 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/Categoria.interface';
import { AtualizarCategoriaDto } from './dto/atualizar-Categoria.dto';
import { CriarCategoriaDto } from './dto/criar-Categoria.dto';

@Injectable()
export class CategoriasService {
    
    constructor(
        @InjectModel('Categoria')
        private readonly categoriaModel: Model<Categoria>,

        @Inject()
        private readonly jogadoresService: JogadoresService 
    ){}

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto;
        const categoriaEncontrada = await this.categoriaModel.findOne({ criarCategoriaDto }).exec();

        if(categoriaEncontrada) {
            throw new BadRequestException(
                `Categoria ${categoria} já encontrada.`
            )
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)

        return await categoriaCriada.save();
    }

    async consultarTodosCategorias(): Promise<Categoria[]> {
        return await this.categoriaModel
            .find()
            .populate("jogadores")
            .exec();
    }

    async consultarCategoriaPeloId(categoria: string): Promise<Categoria> {
        const categoriaEncontrado = await this.categoriaModel.findOne({ categoria }).exec();

        if(!categoriaEncontrado) {
            throw new NotFoundException(`Categoria não encontrada.`)
        }

        return categoriaEncontrado
    }

    async atualizarCategoria(atualizarCategoriaDto: AtualizarCategoriaDto, categoria: String): Promise<Categoria | String> {
        const categoriaEncontrado = await this.categoriaModel.findOne({categoria}).exec();

        if(!categoriaEncontrado) {
            throw new NotFoundException(`Categoria não encontrada.`)
        }

        return await this.categoriaModel.findOneAndUpdate(
            { categoria }, 
            { $set: atualizarCategoriaDto }
        ).exec()
    }

    async atribuirCategoriaJogador(params: String[]): Promise<void> {
        const categoria = params['categoria']
        const idJogador = params['idJogador']

        const categoriaEncontrada = await this.categoriaModel
            .findOne({ categoria })
            .exec()

        const jogadorEncontradoCategoria = await this.categoriaModel
            .find({ categoria })
            .where('jogadores')
            .in(idJogador)
            .exec()

        await this.jogadoresService.consultarJogadorPeloId(idJogador)

        if(!categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} não encontrada.`)
        }

        if(jogadorEncontradoCategoria.length > 0) {
            throw new BadRequestException(`Jogador com o id ${idJogador} já cadastrado na Categoria ${categoria}.`)
        }

        categoriaEncontrada.jogadores.push(idJogador)
        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada }).exec()
    }

    async deletarCategoria(id: string): Promise<String> {
        const categoriaEncontrado = await this.categoriaModel.findOne({ id }).exec();

        if(!categoriaEncontrado) {
            throw new NotFoundException(`Categoria não encontrada.`)
        }

        await this.categoriaModel.deleteOne({ id })

        return 'Categoria removido com sucesso!'
    }
}
