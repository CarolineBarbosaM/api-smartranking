import { 
    IsOptional, 
    ArrayMinSize 
} from "class-validator";
import { DesafioStatus } from "../enum/desafio-status.enum";

export class AtualizarDesafioDto {

    @IsOptional()
    dataHoraDesafio: Date;

    @ArrayMinSize(1)
    status: DesafioStatus;
}