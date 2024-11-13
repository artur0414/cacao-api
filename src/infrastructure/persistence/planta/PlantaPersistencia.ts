// Archivo de persistencia para la entidad Planta en la base de datos MySQL 

import { RowDataPacket } from "mysql2"; // Se importa el tipo de dato RowDataPacket de mysql2
import { Planta } from "../../../domain/models/Planta"; // Se importa el modelo de la entidad Planta
import { PlantaRepositorio } from "../../../domain/repositories/PlantaRepositorio"; // Se importa el repositorio de la entidad Planta
import { DatabaseAdapter } from "../../adapters/MySqlAdapter"; // Se importa el adaptador de base de datos
import { PlantaEntity } from "../../entities/PlantaEntity"; // Se importa la entidad de la planta
import { DatabaseErrorHandler,  DatabaseGenericError,  NotFoundError } from "../../errors/CustomErrors"; // Se importan los errores personalizados


// Clase que implementa el repositorio de la entidad Planta
export class PlantaPersistencia implements PlantaRepositorio {
  constructor(private db: DatabaseAdapter) {}

  // función para almacenar una planta en la base de datos
  async almacenarPlanta(planta: Planta): Promise<Planta> {
    try {
      await this.db.query('INSERT INTO CacaoPlanta (especie, variedad) VALUES (?, ?)', [planta.obtenerEspecie(), planta.obtenerVariedad()]);

      const [resultado] = await this.db.query('SELECT * FROM CacaoPlanta WHERE variedad = ?', [planta.obtenerVariedad()]);

      const plantaCreada = resultado as RowDataPacket;

      return this.mapParaElDominio(new PlantaEntity(plantaCreada[0].especie, plantaCreada[0].variedad, plantaCreada[0].id));

    } catch (error) {
      throw new DatabaseGenericError('Error al almacenar la planta en la base de datos, por favor contacte con el administrador');
    }
  }

  // función para eliminar una planta de la base de datos
  async eliminarPlanta(id: string): Promise<void> {
    try {
      const [rows ] = await this.db.query('DELETE FROM CacaoPlanta WHERE id = ?', [id])
      if( (rows as RowDataPacket).affectedRows === 0) {
        throw new NotFoundError('No existe la planta que desea eliminar');
      }
    } catch (error) {
      throw new DatabaseGenericError('Error al eliminar la planta en la base de datos, por favor contacte con el administrador');
    }
  }

  // función para listar todas las plantas de la base de datos
  async listarPlantas(): Promise<Planta[] | null> {
    try {
      const [rows] = await this.db.query('SELECT * FROM CacaoPlanta');
      if (Array.isArray(rows) && rows.length > 0) {
        const plantas = rows as RowDataPacket;
        return plantas.map((planta: RowDataPacket) => {
          const plantaEntity = new PlantaEntity(planta.especie, planta.variedad, planta.id);
          return this.mapParaElDominio(plantaEntity);
        });
      }
      return null;
  
    } catch (error) {
      throw new DatabaseGenericError('Error al listar las plantas en la base de datos, por favor contacte con el administrador');
    }
  }

  // función para buscar una planta por variedad
  async buscarPorVariedad(variedad: string): Promise<Planta | null> {
    try {
      const [rows] = await this.db.query('SELECT * FROM CacaoPlanta WHERE variedad = ?', [variedad]);
    if (Array.isArray(rows) && rows.length > 0) {
      const planta = rows[0] as RowDataPacket;
      const plantaEntity = new PlantaEntity(planta.especie, planta.variedad, planta.id);
      return this.mapParaElDominio(plantaEntity);
    }
    return null;
    } catch (error) {
      throw new DatabaseGenericError('Error al buscar la planta por variedad en la base de datos, por favor contacte con el administrador');
    }
  }

  // función para buscar una planta por especie
  async buscarPorEspecie(especie:string): Promise<Planta[] | null> {
    try {
      const [rows] = await this.db.query('SELECT * FROM CacaoPlanta WHERE especie = ?', [especie]);
      if(Array.isArray(rows) && rows.length > 0) {
        const plantas = rows as RowDataPacket;
        
        return plantas.map((planta: RowDataPacket) => { 
          const plantaEntity = new PlantaEntity(planta.especie, planta.variedad, planta.id);
          return this.mapParaElDominio(plantaEntity);
        })
      }

      return [];

    } catch (error) {
      throw new DatabaseGenericError('Error al buscar la planta por especie en la base de datos, por favor contacte con el administrador');
    }    
  }

  // función para obtener una planta por ID
  async obtenerPlantaPorId(id: string): Promise<Planta | null> {
    try {
      const [rows] = await this.db.query('SELECT * FROM CacaoPlanta WHERE id = ?', [id]);
      if (Array.isArray(rows) && rows.length > 0) {
        const planta = rows[0] as RowDataPacket;
        const plantaEntity = new PlantaEntity(planta.especie, planta.variedad, planta.id);
        return this.mapParaElDominio(plantaEntity);
      }
      return null;
    } catch (error) {
      throw new DatabaseGenericError('Error al buscar la planta por id en la base de datos, por favor contacte con el administrador');
    }
  }

  // función para actualizar una planta en la base de datos
  async actualizarPlanta(planta: Planta): Promise<Planta> {
    try {

      const [rows] = await this.db.query('UPDATE CacaoPlanta SET especie = ?, variedad = ? WHERE id = ?', [planta.obtenerEspecie(), planta.obtenerVariedad(), planta.obtenerId()!]);

      if((rows as RowDataPacket).affectedRows === 0) {
        throw new NotFoundError('No existe la planta que desea actualizar');
      }

      return planta

    } catch (error: unknown | any) {
         throw new DatabaseErrorHandler(error, 'Error al actualizar la planta en la base de datos, por favor contacte con el administrador', 'variedad').procesarError();
    }
  }

  // función para mapear los datos de la entidad de la base de datos a la entidad del dominio
  private mapParaElDominio(plantaEntity: PlantaEntity): Planta {
    return new Planta(plantaEntity.getEspecie(), plantaEntity.getVariedad(), plantaEntity.getId());
  }
}
