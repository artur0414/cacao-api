// Modelo de Plagas y Enfermedades que se encarga de la lógica de negocio de las plagas y enfermedades

import { BadRequestError } from "../../infrastructure/errors/CustomErrors";
import { validarParcialValueObjectClon } from "../value-objects/clonValueObjectsValidation";
import { plagasEnfermedadesParcialValueObjectEsquema } from "../value-objects/plagasEnfermedadesObjectsValidation";

// Definición de la interfaz de las asociaciones de plagas y enfermedades
interface asociacionesPlagasEnfermedadesDTO {
    nombre_plaga: string;
    enfermedad_asociada: string;
}

// Definición de la interfaz de los campos validables
interface CampoValidable {
    valor: {
        [key: string]: string | asociacionesPlagasEnfermedadesDTO[]; 
      }
    validador: (plaga: any) => { success: boolean; error?: any };
};

export class PlagasEnfermedades {
    constructor(private nombre_clon : string, private asociaciones_plagas_enfermedades: asociacionesPlagasEnfermedadesDTO[], private id?: string) {}


    obtenerNombreClon(): string {
        this.CampoValidable({ valor: {nombre_clon: this.nombre_clon}, validador: validarParcialValueObjectClon});
        return this.nombre_clon;
    }

    obtenerAsociacionesPlagasEnfermedades(): asociacionesPlagasEnfermedadesDTO[] {
        this.CampoValidable({ valor: {asociaciones_plagas_enfermedades: this.asociaciones_plagas_enfermedades}, validador: plagasEnfermedadesParcialValueObjectEsquema });
        return this.asociaciones_plagas_enfermedades;
    }


    obtenerId(): string | undefined {
        return this.id;
    }

    cambiarNombreClon(nuevoNombreClon: string): void {
        this.CampoValidable({ valor: {nombre_clon: nuevoNombreClon}, validador: validarParcialValueObjectClon });
        this.nombre_clon = nuevoNombreClon;
    }

    cambiarAsociacionesPlagasEnfermedades(nuevasAsociacionesPlagasEnfermedades: asociacionesPlagasEnfermedadesDTO[]): void {
        this.CampoValidable({ valor: {asociaciones_plagas_enfermedades: nuevasAsociacionesPlagasEnfermedades}, validador: plagasEnfermedadesParcialValueObjectEsquema });
        this.asociaciones_plagas_enfermedades = nuevasAsociacionesPlagasEnfermedades;
    }

    // Método para validar los campos
    private CampoValidable({valor, validador} : CampoValidable) {
        const resultado = validador(valor);
        if (!resultado.success) {
            throw new BadRequestError(resultado.error.errors[0].message);
        }
    }

}