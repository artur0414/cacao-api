// Entidad que representa la estructura de un mantenimiento en la base de datos

interface asociacionesPlagasEnfermedadesDTO {
    nombre_plaga: string;
    enfermedad_asociada: string;
}

export class PlagasEnfermedadesEntity {
    constructor(public nombre_clon: string, public asociaciones_plagas_enfermedades: asociacionesPlagasEnfermedadesDTO[], public id?: string) {}

    obtenerNombreClon(): string {
        return this.nombre_clon;
    }

    obtenerAsociacionesPlagasEnfermedades(): asociacionesPlagasEnfermedadesDTO[] {
        return this.asociaciones_plagas_enfermedades;
    }

    obtenerId(): string | undefined {
        return this.id;
    }

}