import { 
    IsString, 
    IsOptional, 
    IsArray, 
    ArrayMinSize 
} from "class-validator";
import { Evento } from "../interfaces/Categoria.interface";

export class AtualizarCategoriaDto {

    @IsString()
    @IsOptional()
    readonly descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    readonly evento: Evento[];
}