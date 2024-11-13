// Entidad de la tabla dimensiones en la base de datos

interface Imagenes {
    jpg: string;  
    webp: string; 
    tiff: string; 
}

export class DimensionesEntity {
    constructor(public nombre_clon: string, public altura_maxima: number, public diametro: number, public imagenes: Imagenes, public id?: string) {}

    obtenerNombreClon(): string {
        return this.nombre_clon;
    }

    obtenerAlturaMaxima(): number {
        return this.altura_maxima;
    }

    obtenerDiametro(): number {
        return this.diametro;
    }

    obtenerImagenes(): Imagenes {
        return this.imagenes;
    }

    obtenerId(): string | undefined {
        return this.id;
    }

}