import * as mongoose from 'mongoose';

export const JogadorScherma = new mongoose.Schema({
    telefoneCelular: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    nome: {
        type: String
    },
    ranking: {
        type: String
    },
    posicaoRanking: {
        type: Number
    },
    urlFotoJogador: {
        type: String
    },
}, 
    { 
        timeStamp: true, 
        collection: 'jogadores'
    }
)
