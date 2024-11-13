// Comando que se encarga de crear un clon, si requiere un proceso exxtra a parte de la creación de un clon, se utiliza como puente entre el controlador y el servicio

import { Clon } from "../../../../domain/models/Clon";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { ClonDTO, validarClon } from "../../../dtos/clon_dto";
import { ClonServicio } from "../../../services/ClonServicio";

export class CrearClon {
    // Método que ejecuta la creación de un clon
    static async ejecutar(input: ClonDTO): Promise<Clon> {
        try {
            const clonDatos = validarClon(input);
            if(!clonDatos.success) {
                throw new BadRequestError(clonDatos.error.errors[0].message);
            }
            return await new ClonServicio().crearClon(clonDatos.data);
            
        } catch (error) {
            throw error
        }
    }
}