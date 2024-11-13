// Modelo de Condiciones Climáticas

import { BadRequestError } from "../../infrastructure/errors/CustomErrors";
import { validarParcialValueObjectClon } from "../value-objects/clonValueObjectsValidation";
import { condicionesClimaticasParcialValueObjectEsquema } from "../value-objects/condicionesClimaticasValueObjectValidation";

// Interfaz para tipar el método de validación
interface CampoValidable {
    valor: {
        [key: string]: string; 
      }
    validador: (condiciones: any) => { success: boolean; error?: any };
};

export class CondicionesClimaticas {
    constructor(private nombre_clon: string, private rango_altitudinal:string, private rango_luminosidad: string, private temperatura: string, private precipitacion: string, private humedad_relativa: string, private id?: string) {}    

    obtenerNombreClon(): string {
        this.CampoValidable({ valor: {nombre_clon: this.nombre_clon}, validador: validarParcialValueObjectClon });
        return this.nombre_clon;   
    }

    obtenerRangoAltitudinal(): string {
        this.CampoValidable({ valor: {rango_altitudinal: this.rango_altitudinal}, validador: condicionesClimaticasParcialValueObjectEsquema });
        return this.rango_altitudinal;
    }

    obtenerRangoLuminosidad(): string {
        this.CampoValidable({ valor: {rango_luminosidad : this.rango_luminosidad}, validador: condicionesClimaticasParcialValueObjectEsquema });
        return this.rango_luminosidad;
    }

    obtenerTemperatura(): string {
        this.CampoValidable({ valor: {temperatura: this.temperatura}, validador: condicionesClimaticasParcialValueObjectEsquema });

        return this.temperatura;
    }

    obtenerPrecipitacion(): string {
        this.CampoValidable({ valor: {precipitacion : this.precipitacion}, validador: condicionesClimaticasParcialValueObjectEsquema });

        return this.precipitacion;
    }

    obtenerHumedadRelativa(): string {
        this.CampoValidable({ valor: {humedad_relativa: this.humedad_relativa}, validador: condicionesClimaticasParcialValueObjectEsquema });

        return this.humedad_relativa;
    }

    obtenerId(): string | undefined {
        return this.id;
    }

    cambiarNombreClon(nuevoNombreClon: string): void {
        this.CampoValidable({valor: {nombre_clon : nuevoNombreClon}, validador: validarParcialValueObjectClon});
        this.nombre_clon = nuevoNombreClon;
    }

    cambiarRangoAltitudinal(nuevoRangoAltitudinal: string): void {
        this.CampoValidable({ valor: {rango_altitudinal : nuevoRangoAltitudinal}, validador: condicionesClimaticasParcialValueObjectEsquema });
        this.rango_altitudinal = nuevoRangoAltitudinal;
    }

    cambiarRangoLuminosidad(nuevoRangoLuminosidad: string): void {
        this.CampoValidable({ valor: {rango_luminosidad : nuevoRangoLuminosidad}, validador: condicionesClimaticasParcialValueObjectEsquema });

        this.rango_luminosidad = nuevoRangoLuminosidad;
    }

    cambiarTemperatura(nuevaTemperatura: string): void {
        this.CampoValidable({ valor: {temperatura : nuevaTemperatura}, validador: condicionesClimaticasParcialValueObjectEsquema });

        this.temperatura = nuevaTemperatura;
    }

    cambiarPrecipitacion(nuevaPrecipitacion: string): void {
        this.CampoValidable({ valor: {precipitacion : nuevaPrecipitacion}, validador: condicionesClimaticasParcialValueObjectEsquema });

        this.precipitacion = nuevaPrecipitacion;
    }

    cambiarHumedadRelativa(nuevaHumedadRelativa: string): void {
        this.CampoValidable({ valor: {humedad_relativa : nuevaHumedadRelativa}, validador: condicionesClimaticasParcialValueObjectEsquema });

        this.humedad_relativa = nuevaHumedadRelativa;
    }

    // método para validar los campos
    private CampoValidable({ valor, validador }: CampoValidable): void {
        const resultado = validador(valor);
        if (!resultado.success) {
            throw new BadRequestError(resultado.error.errors[0].message);
        }
    }

}