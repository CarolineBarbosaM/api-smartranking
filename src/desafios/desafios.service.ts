import { JogadoresService } from '../jogadores/jogadores.service';
import { 
    Injectable,
    NotFoundException, 
    BadRequestException, 
    Inject, 
    Logger,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarDesafioDto } from './dto/atualizar-Desafio.dto';
import { CriarDesafioDto } from './dto/criar-Desafio.dto';
import { Desafio, Partida } from './interfaces/desafios.interface';
import { CategoriasService } from 'src/Categorias/Categorias.service';
import { AtribuirDesafioPartidaDto } from './dto/atribuir-desafio-partida.dto';
import { DesafioStatus } from './enum/desafio-status.enum';

@Injectable()
export class DesafiosService {
    
    constructor(
        @InjectModel('Desafio')
        private readonly desafioModel: Model<Desafio>,

        @InjectModel('Partida')
        private readonly partidaModel: Model<Partida>,

        @Inject()
        private readonly jogadoresService: JogadoresService,

        @Inject()
        private readonly categoriaService: CategoriasService,
    ){}

    private logger = new Logger(DesafiosService.name)

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        const jogadores = await this.jogadoresService.consultarTodosJogadores()
        
        criarDesafioDto.jogadores.map(jogadorDto => {
            const jogadorFilter = jogadores.filter(jogador => jogador.id == jogadorDto.id)

            if(jogadorFilter.length == 0) {
                throw new BadRequestException(`O jogador ${ jogadorDto.nome } não é um jogador`)
            }
        })

        const categoriaDoJogador = await this.categoriaService.consultarCategoriaDoJogador(criarDesafioDto.solicitante)

        if(!categoriaDoJogador) {
            throw new BadRequestException(`O solicitante precisa estar registar em uma categoria.`)
        }

        const desafioCriado = new this.desafioModel(criarDesafioDto)
        desafioCriado.categoria = categoriaDoJogador.categoria
        desafioCriado.dataHoraSolicitacao = new Date()

        desafioCriado.status = DesafioStatus.PENDENTE
        this.logger.log(`${JSON.stringify(desafioCriado)}`)

        return await desafioCriado.save()
    }

    async consultarTodosDesafios(): Promise<Desafio[]> {
        return await this.desafioModel
            .find()
            .populate("Solicitante")
            .populate("jogadores")
            .populate("Partida")
            .exec();
    }

    async consultarDesafioDeUmJogador(id: any): Promise<Desafio[]> {

        const jogadores = await this.jogadoresService.consultarTodosJogadores()
        const jogadorFiltro = jogadores.filter(jogador => jogador.id == id)

        if(jogadorFiltro.length == 0) {
            throw new NotFoundException(`Não existe jogador com esse id.`)
        }

        return await this.desafioModel
            .find()
            .where('jogadores')
            .in(id)
            .populate("solicitante")
            .populate("jogadores")
            .populate("partida")
            .exec()
    }

    async atualizarDesafio(atualizarDesafioDto: AtualizarDesafioDto, id: String): Promise<Desafio> {
        const desafioEncontrado = await this.desafioModel.findById({ id }).exec();

        if(!desafioEncontrado) {
            throw new NotFoundException(`Desafio não encontrada.`)
        }

        if(atualizarDesafioDto.status)
            desafioEncontrado.dataHoraResposta = new Date()

        desafioEncontrado.status = atualizarDesafioDto.status
        desafioEncontrado.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio

        return await this.desafioModel.findOneAndUpdate({ id }, {desafioEncontrado}).exec()
    }

    async atribuirDesafioPartida(id: String, atribuirDesafioPartida: AtribuirDesafioPartidaDto): Promise<void> {
        const desafioEncontrado = await this.desafioModel
            .findById({ id })
            .exec()

        if(!desafioEncontrado) {
            throw new BadRequestException(`Desafio não encontrada.`)
        }    

        const jogadorFilter = desafioEncontrado.jogadores.filter(
            jogador => jogador.id == id
        )

        this.logger.log(`desafioEncontrado: ${desafioEncontrado}`)
        this.logger.log(`jogadorFilter: ${jogadorFilter}`)

        if(jogadorFilter.length == 0) {
            throw new BadRequestException(`Jogador já esta cadastrado no Desafio.`)
        }

        const partidaCriada = new this.partidaModel(atribuirDesafioPartida)
        partidaCriada.jogadores = desafioEncontrado.jogadores

        const resultado = await partidaCriada.save()
        desafioEncontrado.status = DesafioStatus.REALIZADO
        desafioEncontrado.partida = resultado.id

        try {
            await this.desafioModel.findOneAndUpdate({ id }, { $set: desafioEncontrado }).exec()
        } catch (error) {
            await this.partidaModel.deleteOne({ id: resultado.id }).exec()
            throw new InternalServerErrorException()
        }
    }

    async deletarDesafio(id: string): Promise<String> {
        const desafioEncontrado = await this.desafioModel.findOne({ id }).exec();

        if(!desafioEncontrado) {
            throw new NotFoundException(`Desafio não encontrado.`)
        }

        desafioEncontrado.status = DesafioStatus.CANCELADO
        await this.desafioModel.findOneAndUpdate({ id }, {$set: desafioEncontrado }).exec()

        return 'Categoria removido com sucesso!'
    }
}
