import { Document } from "mongoose";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Categoria extends Document {
  readonly idcategoria: string;
  descricao: string;
  evento: Evento[];
  jogadores: Array<Jogador>;
  urlFotoJogador: string;
}

export interface Evento {
  nome: string;
  operacao: string;
  valor: number;
}
