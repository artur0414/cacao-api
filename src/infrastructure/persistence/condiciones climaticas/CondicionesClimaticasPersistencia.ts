// Persistencia de las condiciones climáticas en la base de datos

import { RowDataPacket } from "mysql2";
import { CondicionesClimaticas } from "../../../domain/models/CondicionesClimaticas";
import { CondicionesClimaticasRepositorio } from "../../../domain/repositories/CondicionesClimaticasRepositorio";
import { DatabaseAdapter } from "../../adapters/MySqlAdapter";
import { DatabaseGenericError, NotFoundError, DatabaseErrorHandler } from "../../errors/CustomErrors";
import { CondicionesClimaticasEntity } from "../../entities/CondicionesClimaticasEntity";


export class CondicionesClimaticasPersistencia implements CondicionesClimaticasRepositorio {
  constructor(private db: DatabaseAdapter) {}

  // Método para almacenar las condiciones climáticas en la base de datos
  async almacenarCondicionesClimaticas(condicionesClimaticas: CondicionesClimaticas): Promise<CondicionesClimaticas> {
    try {
        await this.db.query('INSERT INTO CondicionesClimaticas (nombre_clon, rango_altitudinal, rango_luminosidad, temperatura, precipitacion, humedad_relativa) VALUES (?, ?, ?, ?, ?, ?)', [condicionesClimaticas.obtenerNombreClon(), condicionesClimaticas.obtenerRangoAltitudinal(), condicionesClimaticas.obtenerRangoLuminosidad(), condicionesClimaticas.obtenerTemperatura(), condicionesClimaticas.obtenerPrecipitacion(), condicionesClimaticas.obtenerHumedadRelativa()]);

        const [resultado] = await this.db.query('SELECT * FROM CondicionesClimaticas WHERE nombre_clon = ?', [condicionesClimaticas.obtenerNombreClon()]);

        if(Array.isArray(resultado) && resultado.length > 0) {
            return this.mapParaElDominio(resultado[0] as CondicionesClimaticasEntity);
        }

        throw new DatabaseGenericError('Error al almacenar las condiciones climáticas en la base de datos, por favor contacte con el administrador');
        
    } catch (error) {
        throw new DatabaseErrorHandler(error, 'Error al almacenar las condiciones climáticas en la base de datos, por favor contacte con el administrador', 'clon').procesarError();
    }
  }

  // Método para obtener las condiciones climáticas por nombre de clon
  async obtenerCondicionesClimaticasPorNombreClon(nombreClon: string): Promise<CondicionesClimaticas | null> {
      try {
        const [rows] = await this.db.query('SELECT * FROM CondicionesClimaticas WHERE nombre_clon = ?', [nombreClon]);
        return Array.isArray(rows) && rows.length > 0 ? this.mapParaElDominio(rows[0] as CondicionesClimaticasEntity) : null;

      } catch (error) {
        throw new DatabaseGenericError('Error al obtener las condiciones climáticas en la base de datos, por favor contacte con el administrador');
      }
  }

  // Método para obtener las condiciones climáticas por id
  async obtenerCondicionesClimaticasPorId(id: string): Promise<CondicionesClimaticas | null> {
      try {
        const [rows] = await this.db.query('SELECT * FROM CondicionesClimaticas WHERE id = ?', [id]);
        return Array.isArray(rows) && rows.length > 0 ? this.mapParaElDominio(rows[0] as CondicionesClimaticasEntity) : null;

      } catch (error) {
        throw new DatabaseGenericError('Error al obtener las condiciones climáticas en la base de datos, por favor contacte con el administrador')
      }
  }
  
    // Método para actualizar las condiciones climáticas en la base de datos
    async actualizarCondicionesClimaticas(condicionesClimaticas: CondicionesClimaticas): Promise<CondicionesClimaticas> {
        try {
            const [rows] = await this.db.query('UPDATE CondicionesClimaticas SET nombre_clon = ?, rango_altitudinal = ?, rango_luminosidad = ?, temperatura = ?, precipitacion = ?, humedad_relativa = ? WHERE id = ?', [condicionesClimaticas.obtenerNombreClon(), condicionesClimaticas.obtenerRangoAltitudinal(), condicionesClimaticas.obtenerRangoLuminosidad(), condicionesClimaticas.obtenerTemperatura(), condicionesClimaticas.obtenerPrecipitacion(), condicionesClimaticas.obtenerHumedadRelativa(), condicionesClimaticas.obtenerId()!]);

            if((rows as RowDataPacket).affectedRows === 0) {
                throw new NotFoundError('No se ha actualizado ninguna fila, por favor verifique los datos');
            }

            return condicionesClimaticas;
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al actualizar las condiciones climáticas en la base de datos, por favor contacte con el administrador', 'clon').procesarError();   
        }
    }
    
    // Método para mapear los datos de la entidad a la clase de dominio
    private mapParaElDominio(condicionesClimaticas: CondicionesClimaticasEntity): CondicionesClimaticas {
        const condicionesClimaticasEntidad = new CondicionesClimaticasEntity(condicionesClimaticas.nombre_clon, condicionesClimaticas.rango_altitudinal, condicionesClimaticas.rango_luminosidad, condicionesClimaticas.temperatura, condicionesClimaticas.precipitacion, condicionesClimaticas.humedad_relativa, condicionesClimaticas.id);
        return new CondicionesClimaticas(condicionesClimaticasEntidad.obtenerNombreClon(), condicionesClimaticasEntidad.obtenerRangoAltitudinal(), condicionesClimaticasEntidad.obtenerRangoLuminosidad(), condicionesClimaticasEntidad.obtenerTemperatura(), condicionesClimaticasEntidad.obtenerPrecipitacion(), condicionesClimaticasEntidad.obtenerHumedadRelativa(), condicionesClimaticasEntidad.obtenerId());
    }

}