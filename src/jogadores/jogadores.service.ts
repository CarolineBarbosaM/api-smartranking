import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dto/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {

    constructor(
        @InjectModel('Jogador')
        private readonly jogadorModel: Model<Jogador>
    ){}

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.criar(criarJogadorDto);
    }

    async atualizarJogador(atualizarJogadorDto: AtualizarJogadorDto, id: String): Promise<Jogador | String> {
        const jogadorEncontrado = await this.jogadorModel.findOne({id}).exec();

        if(jogadorEncontrado) {
            return await this.atualizar(atualizarJogadorDto);
        }

        return 'Erro ao tentar atualizar o jogador.'
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPeloId(id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({id}).exec();

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador não encontrado.`)
        }

        return jogadorEncontrado
    }

    async deletarJogador(id: string): Promise<String> {
        const jogadorEncontrado = await this.jogadorModel.findOne({id}).exec();

        if(!jogadorEncontrado) {
            return 'Jogador não encontrado!'
        }

        await this.jogadorModel.deleteOne({
            id
        })

        return 'Jogador removido com sucesso!'
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(criarJogadorDto)

        return await jogadorCriado.save()
    }

    private async atualizar(atualizarJogadorDto: AtualizarJogadorDto):Promise<Jogador> {
       
        return await this.jogadorModel.findOneAndUpdate(
            {nome: atualizarJogadorDto.nome}, 
            {$set: atualizarJogadorDto}
        ).exec()
    }
}
