import { Document } from "mongoose";
export interface Jogador extends Document {
  readonly id: string;
  readonly telefoneCelular: string;
  readonly email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}
