import * as mongoose from 'mongoose';

export const CategoriaScherma = new mongoose.Schema({
    categoria: {
        type: String,
        unique: true
    },
    descricao: {
        type: String,
    },
    eventos: [
        {
            nome: { type: String },
            operacao: { type: String },
            valor: { type: Number }
        }
    ],
    jogadores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jogador"
        }
    ],
}, 
    { 
        timeStamp: true, 
        collection: 'categorias'
    }
)
