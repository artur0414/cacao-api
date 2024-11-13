// Dominio del modelo Clon que representa un clon de cacao

import { BadRequestError } from "../../infrastructure/errors/CustomErrors";
import { validarParcialValueObjectClon } from "../value-objects/clonValueObjectsValidation";
import { validarParcialValueObjectPlanta } from "../value-objects/plantaValueObjectValidation";

// Interfaz del método de validación de campos
interface CampoValidable {
    valor: {
        [key: string]: string; 
      }
    validador: (clon: any) => { success: boolean; error?: any };
};
  
// Clase que representa un clon de cacao
export class Clon {
    static initModel(sequelize: any) {
        throw new Error("Method not implemented.");
    }
    constructor(
        private variedad: string,
        private nombre_clon: string,
        private origen: string,
        private descripcion: string,
        private id?: string
    ) {}
    
    // Métodos para obtener y cambiar el cacao_planta_id del clon

    obtenerClonCacaoPlantaId(): string {
        this.CampoValidable({ valor: {variedad : this.variedad}, validador: validarParcialValueObjectPlanta });
        return this.variedad;
    }

    obtenerClonNombre(): string {
        this.CampoValidable({ valor: {nombre_clon : this.nombre_clon}, validador: validarParcialValueObjectClon });
        return this.nombre_clon;
    }

    obtenerClonOrigen(): string {
        this.CampoValidable({ valor: {origen : this.origen}, validador: validarParcialValueObjectClon });
        return this.origen;
    }

    obtenerClonDescripcion(): string {
        this.CampoValidable({ valor: {descripcion : this.descripcion}, validador: validarParcialValueObjectClon });
        return this.descripcion;
    }


    obtenerClonId(): string | undefined {
        return this.id;
    }

    cambiarNombreClon(nuevoNombre: string): void {
        this.CampoValidable({valor: {nombre_clon: nuevoNombre}, validador: validarParcialValueObjectClon});
        this.nombre_clon = nuevoNombre;
    }

    cambiarOrigenClon(nuevoOrigen: string): void {
        this.CampoValidable({valor: {origen: nuevoOrigen}, validador: validarParcialValueObjectClon});
        this.origen = nuevoOrigen;
    }

    cambiarDescripcionClon(nuevaDescripcion: string): void {
        this.CampoValidable({valor: {descripcion: nuevaDescripcion}, validador: validarParcialValueObjectClon});
        this.descripcion = nuevaDescripcion;
    }

    cambiarVariedadClon(nuevaVariedad: string): void {
        this.CampoValidable({valor: {variedad: nuevaVariedad}, validador: validarParcialValueObjectPlanta});
        this.variedad = nuevaVariedad;
    }

    // Método para validar los campos del clon
    private CampoValidable({ valor, validador }: CampoValidable): void {
        const resultado = validador(valor);
        if (!resultado.success) {
            throw new BadRequestError(resultado.error.errors[0].message);
        }
    }

}