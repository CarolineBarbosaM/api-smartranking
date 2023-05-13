import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(
        @InjectModel('Jogador')
        private readonly jogadorModel: Model<Jogador>
    ){}

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const { email } = criarJogadorDto
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado) {
            return await this.atualizar(criarJogadorDto);
        }

        return await this.criar(criarJogadorDto);
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPorEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado.`)
        }

        return jogadorEncontrado
    }

    async deletarJogador(email: string): Promise<String> {
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(!jogadorEncontrado) {
            return 'Jogador não encontrado!'
        }

        await this.jogadorModel.deleteOne({
            email
        })

        return 'Jogador removido com sucesso!'
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(criarJogadorDto)

        return await jogadorCriado.save()
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto):Promise<Jogador> {
       
        return await this.jogadorModel.findOneAndUpdate(
            {email: criarJogadorDto.email}, 
            {$set: criarJogadorDto}
        ).exec()
    }
}
