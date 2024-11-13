// Entidad de la tabla condiciones_climaticas de la base de datos 

export class CondicionesClimaticasEntity {

    constructor(public nombre_clon: string, public rango_altitudinal:string, public rango_luminosidad: string, public temperatura: string, public precipitacion: string, public humedad_relativa: string, public id?: string) {}

    obtenerNombreClon(): string {
        return this.nombre_clon;
    }

    obtenerRangoAltitudinal(): string {
        return this.rango_altitudinal;
    }

    obtenerRangoLuminosidad(): string {
        return this.rango_luminosidad;
    }

    obtenerTemperatura(): string {
        return this.temperatura;
    }

    obtenerPrecipitacion(): string {
        return this.precipitacion;
    }

    obtenerHumedadRelativa(): string {
        return this.humedad_relativa;
    }

    obtenerId(): string | undefined {
        return this.id;
    }
    
}