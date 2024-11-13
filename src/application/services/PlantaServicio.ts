// Este servicio es un puente entre el controlador y la lógica de negocio de la aplicación. Se encarga de manejar la lógica de negocio de la entidad Planta.

import { Planta } from "../../domain/models/Planta"; // Se importa el modelo de dominio Planta
import { DatabaseAdapter } from "../../infrastructure/adapters/MySqlAdapter"; // Se importa el adaptador de base de datos
import { PlantaEntity } from "../../infrastructure/entities/PlantaEntity"; // Se importa la entidad PlantaEntity
import { DuplicateEntryError, NotFoundError } from "../../infrastructure/errors/CustomErrors"; // Se importan los errores personalizados
import { PlantaPersistencia } from "../../infrastructure/persistence/planta/PlantaPersistencia"; // Se importa la persistencia de la entidad Planta
import { PlantaDTO } from "../dtos/planta_dto"; // Se importa el DTO de la entidad Planta


export class PlantaServicio {

    private persistencia: PlantaPersistencia;

    constructor() {
        this.persistencia = new PlantaPersistencia(new DatabaseAdapter());
    }
    // Este método se encarga de almacenar una nueva planta en la base de datos
    async almacenarPlanta(plantaData: PlantaDTO): Promise<Planta> {
        try {
            // Crear una instancia de la entidad Planta
            const planta = new PlantaEntity(plantaData.especie, plantaData.variedad);
            const datos = new Planta(planta.especie, planta.variedad);


            // Verificar si ya existe una planta con la variedad proporcionada
            const plantaExistente = await this.persistencia.buscarPorVariedad(plantaData.variedad);

            if (plantaExistente !== null) {
                throw new DuplicateEntryError('Ya existe una planta con la variedad proporcionada, si desea modificar la planta, por favor actualice los datos correspondientes a la planta');
            }

            // Almacenar el modelo de dominio en la base de datos y retornar el resultado
            return await this.persistencia.almacenarPlanta(datos);

        } catch (error) {
            throw error;
        }
    }

    // Este método se encarga de eliminar una planta de la base de datos
    async eliminarPlanta(id: string) {
        try {
            const plantaExistente = await this.persistencia.obtenerPlantaPorId(id);
            if(plantaExistente === null) {
                throw new NotFoundError('La planta que desea eliminar no existe');
            }
            await this.persistencia.eliminarPlanta(plantaExistente.obtenerId()!);
        } catch (error) {
            throw error;
        }
    }   
    
    // Este método se encarga de actualizar una planta en la base de datos
    async actualizarPlanta(datos: Partial<PlantaDTO> & {id: string}): Promise<Planta> {
        try {

            const plantaExistente = await this.persistencia.obtenerPlantaPorId(datos.id);

            if (!plantaExistente) {
                throw new NotFoundError('La planta que desea actualizar no existe');
            }

            // Actualizar los datos de la planta
            if (datos.especie) {
                plantaExistente.cambiarEspecie(datos.especie);
            }

            if (datos.variedad) {
                plantaExistente.cambiarVariedad(datos.variedad);
            }

            return await this.persistencia.actualizarPlanta(plantaExistente);        

        } catch (error) {
            throw error;
        }
    }
}