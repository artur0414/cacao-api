// Modelos de la entidad Dimensiones 

import { BadRequestError } from "../../infrastructure/errors/CustomErrors";
import { validarDimensionesParcialValueObjectEsquema } from "../value-objects/DimensionesValueObjects";
import { validarParcialValueObjectClon } from "../value-objects/clonValueObjectsValidation";

// Interfaz para las imágenes de la entidad Dimensiones
interface Imagenes {
    jpg: string;  
    webp: string; 
    tiff: string; 
}

// Interfaz para validar los campos de la entidad Dimensiones
interface campoValidacion {
    valor: {
        [key: string]: string | Imagenes | number; 
    }
    validador: (mantenimiento: any) => { success: boolean; error?: any };
};

export class Dimensiones {
    constructor(public nombre_clon: string, public altura_maxima: number, public diametro: number, public imagenes: Imagenes, public id?: string) {}

    obtenerNombreClon(): string {
        this.CampoValidable({ valor: {nombre_clon: this.nombre_clon}, validador: validarParcialValueObjectClon });
        return this.nombre_clon;
    }

    obtenerAlturaMaxima(): number {
        this.CampoValidable({ valor: {altura_maxima: this.altura_maxima}, validador: validarDimensionesParcialValueObjectEsquema });
        return this.altura_maxima;
    }

    obtenerDiametro(): number {
        this.CampoValidable({ valor: {diametro: this.diametro}, validador: validarDimensionesParcialValueObjectEsquema });
        return this.diametro;
    }

    obtenerImagenes(): Imagenes {
        this.CampoValidable({ valor: {imagenes: this.imagenes}, validador: validarDimensionesParcialValueObjectEsquema });
        return this.imagenes;
    }

    obtenerId(): string | undefined {
        return this.id;
    }

    cambiarNombreClon(nuevoNombreClon: string): void {
        this.CampoValidable({valor: {nombre_clon : nuevoNombreClon}, validador: validarParcialValueObjectClon});
        this.nombre_clon = nuevoNombreClon;
    }

    cambiarAlturaMaxima(nuevaAlturaMaxima: number): void {
        this.CampoValidable({valor: {altura_maxima : nuevaAlturaMaxima}, validador: validarDimensionesParcialValueObjectEsquema});
        this.altura_maxima = nuevaAlturaMaxima;
    }

    cambiarDiametro(nuevoDiametro: number): void {
        this.CampoValidable({valor: {diametro : nuevoDiametro}, validador: validarDimensionesParcialValueObjectEsquema});
        this.diametro = nuevoDiametro;
    }

    cambiarImagenes(nuevasImagenes: Imagenes): void {
        this.CampoValidable({valor: {imagenes : nuevasImagenes}, validador: validarDimensionesParcialValueObjectEsquema});
        this.imagenes = nuevasImagenes;
    }
    
    // Método para validar los campos de la entidad Dimensiones
    private CampoValidable({valor, validador}: campoValidacion): void {
        const validacion = validador(valor);
        if (!validacion.success) {
            throw new BadRequestError(validacion.error.errors[0].message);
        }
    }
}