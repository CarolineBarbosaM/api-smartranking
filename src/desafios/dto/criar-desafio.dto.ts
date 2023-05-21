import { 
    IsNotEmpty, 
    IsString, 
    IsArray, 
    ArrayMinSize, 
    IsDateString,
    ArrayMaxSize
} from "class-validator";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export class CriarDesafioDto {

    @IsNotEmpty()
    @IsDateString()
    dataHoraDesafio: Date;

    @IsNotEmpty()
    solicitante: Jogador;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Jogador[];
}