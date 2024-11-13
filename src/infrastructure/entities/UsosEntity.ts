// Entidad que representa la estructura de un mantenimiento en la base de datos

export class UsosEntity {
    constructor(public nombre_clon: string, public usos: string[], public expansion_geografica: string[], public id?: string) {}

    obtenerNombreClon(): string {
        return this.nombre_clon;
    }

    obtenerUsos(): string[] {
        return this.usos;
    }

    obtenerExpansionGeografica(): string[] {
        return this.expansion_geografica;
    }

    obtenerId(): string | undefined {
        return this.id;
    }
}