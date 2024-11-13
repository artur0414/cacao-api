// Servicio de Condiciones Climáticas que es un puente entre la persistencia y el controlador

import { CondicionesClimaticas } from "../../domain/models/CondicionesClimaticas";
import { DatabaseAdapter } from "../../infrastructure/adapters/MySqlAdapter";
import { CondicionesClimaticasEntity } from "../../infrastructure/entities/CondicionesClimaticasEntity";
import { DuplicateEntryError, NotFoundError } from "../../infrastructure/errors/CustomErrors";
import { CondicionesClimaticasPersistencia } from "../../infrastructure/persistence/condiciones climaticas/CondicionesClimaticasPersistencia";
import { CondicionesClimaticasDTO } from "../dtos/condicionesClimaticas_dto";



export class CondicionesClimaticasServicio {
    private persistencia: CondicionesClimaticasPersistencia;

    constructor() {
        this.persistencia = new CondicionesClimaticasPersistencia(new DatabaseAdapter());
    }

    // Método para crear condiciones climáticas
    async crearCondicionesClimaticas(condicionesClimaticas: CondicionesClimaticasDTO): Promise<CondicionesClimaticas> {
        try {
            const condicionesClimaticasExistentes = await this.persistencia.obtenerCondicionesClimaticasPorNombreClon(condicionesClimaticas.nombre_clon);
            if(condicionesClimaticasExistentes !== null) {
                throw new DuplicateEntryError ('El clon ya tiene condiciones climáticas asignadas, si desea modificarlas, por favor actualice los datos correspondientes al clon');
            }
            const condicionesClimaticasEntidad = new CondicionesClimaticasEntity(condicionesClimaticas.nombre_clon, condicionesClimaticas.rango_altitudinal, condicionesClimaticas.rango_luminosidad, condicionesClimaticas.temperatura, condicionesClimaticas.precipitacion, condicionesClimaticas.humedad_relativa);

            const datos = new CondicionesClimaticas(condicionesClimaticasEntidad.obtenerNombreClon(), condicionesClimaticasEntidad.obtenerRangoAltitudinal(), condicionesClimaticasEntidad.obtenerRangoLuminosidad(), condicionesClimaticasEntidad.obtenerTemperatura(), condicionesClimaticasEntidad.obtenerPrecipitacion(), condicionesClimaticasEntidad.obtenerHumedadRelativa());

            return await this.persistencia.almacenarCondicionesClimaticas(datos);

        } catch (error) {
            throw error;
        }
    }

    // Método para actualizar condiciones climáticas
    async actualizarCondicionesClimaticas(condicionesClimaticas: Partial<CondicionesClimaticasDTO> & { id: string }): Promise<CondicionesClimaticas> {

        try {
            const condicionesClimaticasExistentes = await this.persistencia.obtenerCondicionesClimaticasPorId(condicionesClimaticas.id);
            if(condicionesClimaticasExistentes === null) {
                throw new NotFoundError('No existen condiciones climáticas con el id proporcionado, por favor, verifique los datos');
            }

            if(condicionesClimaticas.nombre_clon) {
                const verificarSiExisteNombreClon = await this.persistencia.obtenerCondicionesClimaticasPorNombreClon(condicionesClimaticas.nombre_clon);
                if(verificarSiExisteNombreClon !== null) {
                    throw new DuplicateEntryError('Ya existen condiciones climáticas con el nombre de clon proporcionado, si desea modificar las condiciones climáticas, por favor dirijase al clon correspondiente');
                }
                condicionesClimaticasExistentes.cambiarNombreClon(condicionesClimaticas.nombre_clon);
            }

            const cambios: { [key: string]: (value: string) => void } = {
                rango_altitudinal: (value: string) => condicionesClimaticasExistentes.cambiarRangoAltitudinal(value),
                rango_luminosidad: (value: string) => condicionesClimaticasExistentes.cambiarRangoLuminosidad(value),
                temperatura: (value: string) => condicionesClimaticasExistentes.cambiarTemperatura(value),
                precipitacion: (value: string) => condicionesClimaticasExistentes.cambiarPrecipitacion(value),
                humedad_relativa: (value: string) => condicionesClimaticasExistentes.cambiarHumedadRelativa(value),
            };
    
            for (const condicion in condicionesClimaticas) {
                if (condicion in cambios && condicionesClimaticas[condicion as keyof typeof condicionesClimaticas] !== undefined) {
                    cambios[condicion](condicionesClimaticas[condicion as keyof typeof condicionesClimaticas]!);
                }
            }
            return await this.persistencia.actualizarCondicionesClimaticas(condicionesClimaticasExistentes);

        } catch (error) {
            throw error
        }
    }
}