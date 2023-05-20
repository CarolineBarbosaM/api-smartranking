import { 
    IsNotEmpty, 
    IsString, 
    IsArray, 
    ArrayMinSize 
} from "class-validator";
import { Evento } from "../interfaces/Categoria.interface";

export class CriarCategoriaDto {

    @IsString()
    @IsNotEmpty()
    readonly categoria: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsNotEmpty()
    eventos: Array<Evento>;
}