// Entidad que representa las caracteristicas de un clon en la base de datos

export class CaracteristicasClonEntity {
    constructor(public nombre_clon: string, public caracteristicas: string[], public id?: string) {}

    obtenerNombreClon(): string {
        return this.nombre_clon;
    }

    obtenerCaracteristicasClon(): string[] {
        return this.caracteristicas;
    }
}