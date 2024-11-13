// Entity que representa la estructura de un mantenimiento en la base de datos

export class MantenimientoEntity {
    constructor (public nombre_clon: string, public tipo_abonos: string[], public frecuencia_podas: string, public id?: string) {}

    obtenerNombreClon(): string {
        return this.nombre_clon;
    }

    obtenerTipoAbonos(): string[] {
        return this.tipo_abonos;
    }

    obtenerFrecuenciaPodas(): string {
        return this.frecuencia_podas;
    }

    obtenerId(): string | undefined {
        return this.id;
    }
}