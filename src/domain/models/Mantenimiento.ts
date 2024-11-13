// Modelo de dominio de Mantenimiento

import { BadRequestError } from "../../infrastructure/errors/CustomErrors";
import { mantenimientoParcialValueObjectEsquema } from "../value-objects/MantenimientoObjectsValidation";
import { validarParcialValueObjectClon } from "../value-objects/clonValueObjectsValidation";

// Tipado de la interfaz CampoValidable en el método CampoValidable
interface CampoValidable {
    valor: {
        [key: string]: string | string[]; 
      }
    validador: (mantenimiento: any) => { success: boolean; error?: any };
};

export class Mantenimiento {
    constructor(private nombre_clon:string, private tipo_abonos: string[], private frecuencia_podas: string, private id: string) {}

    obtenerNombreClon(): string {
        this.CampoValidable({ valor: {nombre_clon: this.nombre_clon}, validador: validarParcialValueObjectClon });
        return this.nombre_clon;
    }

    obtenerTipoAbonos(): string[] {
        this.CampoValidable({valor: {tipo_abonos: this.tipo_abonos}, validador: mantenimientoParcialValueObjectEsquema});
        return this.tipo_abonos;
    }

    obtenerFrecuenciaPodas(): string {
        this.CampoValidable({valor: {frecuencia_podas: this.frecuencia_podas}, validador: mantenimientoParcialValueObjectEsquema});
        return this.frecuencia_podas;
    }

    obtenerId(): string {
        return this.id;
    }

    cambiarNombreClon(nuevoNombreClon: string): void {
        this.CampoValidable({valor: {nombre_clon: nuevoNombreClon}, validador: validarParcialValueObjectClon});
        this.nombre_clon = nuevoNombreClon;
    }

    cambiarTipoAbonos(nuevoTipoAbonos: string[]): void {
        this.CampoValidable({valor: {tipo_abonos: nuevoTipoAbonos}, validador: mantenimientoParcialValueObjectEsquema});
        this.tipo_abonos = nuevoTipoAbonos;
    }

    cambiarFrecuenciaPodas(nuevaFrecuenciaPodas: string): void {
        this.CampoValidable({valor: {frecuencia_podas: nuevaFrecuenciaPodas}, validador: mantenimientoParcialValueObjectEsquema});
        this.frecuencia_podas = nuevaFrecuenciaPodas;
    }

    // Método para validar los campos del mantenimiento
    private CampoValidable({valor, validador} : CampoValidable) {
        const resultado = validador(valor);
        if (!resultado.success) {
            throw new BadRequestError(resultado.error.errors[0].message);
        }
    }

}