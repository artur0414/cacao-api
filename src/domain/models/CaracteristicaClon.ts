// Modelo de dominio que representa las caracteristicas de los clones

import { validarParcialValueObjectClon } from "../value-objects/clonValueObjectsValidation";
import { validarCaracteristicaClon } from "../value-objects/caracteristicaClon";
import { BadRequestError } from "../../infrastructure/errors/CustomErrors";

interface CampoValidable {
    valor: {
        [key: string]: string;
    }; 
    validador: (clon: any) => { success: boolean; error?: any };
};

export class CaracteristicaClon {
    constructor(
        private nombre_clon: string,
        private caracteristicas: string[],
        private id?: string,
    ){}

    obtenerCaracteristicas(): string[] {
        // Validar cada característica del array
        this.caracteristicas.forEach((caracteristica: string) => {
            const resultado = validarCaracteristicaClon(caracteristica);
            if (!resultado.success) {
                throw new BadRequestError(resultado.error.errors[0].message); 
            }
        });
    
        return this.caracteristicas;
    }

    obtenerNombreClon(): string {
        this.CampoValidable({ valor: {nombre_clon: this.nombre_clon}, validador: validarParcialValueObjectClon });
        return this.nombre_clon;
    }

    obtenerId(): string | undefined {
        return this.id;
    }

    actualizarCaracteristica(nuevasCaracteristicas: string[]): void {

        nuevasCaracteristicas.forEach((caracteristica: string) => {
            const resultado = validarCaracteristicaClon(caracteristica);
            if (!resultado.success) {
                throw new BadRequestError(resultado.error.errors[0].message); 
            }
        });

        this.caracteristicas = nuevasCaracteristicas;
        
    }

    // Método para validar los campos del objeto

    private CampoValidable({ valor, validador }: CampoValidable): void {
        const resultado = validador(valor);
        if (!resultado.success) {
            throw new BadRequestError(resultado.error.errors[0].message);
        }
    }
}