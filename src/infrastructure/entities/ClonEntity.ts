//Entidad de la base de datos de clones

export class ClonEntity {
    constructor(public variedad: string, public nombre_clon: string, public origen: string, public descripcion: string, public id?: string) {}

    getVariedad(): string {
        return this.variedad;
    }

    getNombreClon(): string {
        return this.nombre_clon;
    }

    getOrigen(): string {
        return this.origen;
    }

    getDescripcion(): string {
        return this.descripcion;
    }


    getId(): string | undefined {
        return this.id;
    }
}