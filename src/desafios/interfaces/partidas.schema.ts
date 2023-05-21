import * as mongoose from 'mongoose';

export const Partidascherma = new mongoose.Schema({
    categoria: {
        type: String,
    },
    def: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jogador"
    },
    jogadores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jogador"
        }
    ],
    resultado: [
        {
            set: { type: String }
        }
    ],
}, 
    { 
        timeStamp: true, 
        collection: 'partidas'
    }
)
