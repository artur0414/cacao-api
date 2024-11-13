// Modelo de la entidad Usos que se encarga de la lógica de negocio de la entidad y de la validación de los datos

import { BadRequestError } from "../../infrastructure/errors/CustomErrors";
import { validarParcialValueObjectClon } from "../value-objects/clonValueObjectsValidation";
import { usosParcialValueObjectEsquema } from "../value-objects/UsosObjectsValidation";

// Interfaz para validar los campos de la entidad
interface campoValidable {
    valor: {
        [key: string]: string | string[]; 
      }
    validador: (plaga: any) => { success: boolean; error?: any };
}

export class Usos {
    constructor(private nombre_clon: string, private usos: string[], private expansion_geografica: string[], private id?: string) {}

    obtenerNombreClon(): string {
        this.CampoValidable({ valor: {nombre_clon: this.nombre_clon}, validador: validarParcialValueObjectClon});
        return this.nombre_clon;
    }

    obtenerUsos(): string[] {
        this.CampoValidable({ valor: {usos: this.usos}, validador: usosParcialValueObjectEsquema });
        return this.usos;
    }

    obtenerExpansionGeografica(): string[] {
        this.CampoValidable({ valor: {expansion_geografica: this.expansion_geografica}, validador: usosParcialValueObjectEsquema });
        return this.expansion_geografica;
    }

    obtenerId(): string | undefined {
        return this.id;
    }

    cambiarNombreClon(nuevoNombreClon: string): void {
        this.CampoValidable({ valor: {nombre_clon: nuevoNombreClon}, validador: validarParcialValueObjectClon });
        this.nombre_clon = nuevoNombreClon;
    }

    cambiarUsos(nuevosUsos: string[]): void {
        this.CampoValidable({ valor: {usos: nuevosUsos}, validador: usosParcialValueObjectEsquema });
        this.usos = nuevosUsos;
    }

    cambiarExpansionGeografica(nuevaExpansionGeografica: string[]): void {
        this.CampoValidable({ valor: {expansion_geografica: nuevaExpansionGeografica}, validador: usosParcialValueObjectEsquema });
        this.expansion_geografica = nuevaExpansionGeografica;
    }

    // Método para validar los campos de la entidad
    private CampoValidable({valor, validador} : campoValidable) {
        const resultado = validador(valor);
        if (!resultado.success) {
            throw new BadRequestError(resultado.error.errors[0].message);
        }
    }
}