// Servicio que se encarga de las operaciones CRUD de los clones que necesitan acciones adicionales a la creación, eliminación y actualización de un clon

import { Clon } from "../../domain/models/Clon";
import { DatabaseAdapter } from "../../infrastructure/adapters/MySqlAdapter";
import { ClonEntity } from "../../infrastructure/entities/ClonEntity";
import { DuplicateEntryError, NotFoundError } from "../../infrastructure/errors/CustomErrors";
import { ClonPersistencia } from "../../infrastructure/persistence/clon/ClonPersistencia";
import { PlantaPersistencia } from "../../infrastructure/persistence/planta/PlantaPersistencia";
import { ClonDTO } from "../dtos/clon_dto";

export class ClonServicio {
    private persistencia: ClonPersistencia;
    private plantaPersistencia: PlantaPersistencia;

    constructor() {
        this.persistencia = new ClonPersistencia(new DatabaseAdapter());
        this.plantaPersistencia = new PlantaPersistencia(new DatabaseAdapter());

    }

    // Este método se encarga de almacenar un nuevo clon en la base de datos

    async crearClon(clonData: ClonDTO): Promise<Clon> {
        try {
            const clon = new ClonEntity(clonData.variedad, clonData.nombre_clon, clonData.origen, clonData.descripcion);
            const datos = new Clon(clon.variedad, clon.nombre_clon, clon.origen, clon.descripcion);

            const clonExistente = await this.persistencia.buscarClonPorNombre(clonData.nombre_clon);

            if(clonExistente !== null) {
                throw new DuplicateEntryError('Ya existe un clon con el nombre proporcionado, si desea actualizarlo, por favor dirijase al clon correspondiente');
            }

            const variedadclonExistente = await this.plantaPersistencia.buscarPorVariedad(clonData.variedad);

            if(variedadclonExistente === null) {
                throw new NotFoundError('La variedad proporcionada no existe');
            }

            return await this.persistencia.almacenarClon(datos);

            
        } catch (error) {
            throw error;
        }
    }

    // Este método se encarga de eliminar un clon de la base de datos
    async eliminarClon(id: string) {
        try {
            const clonExistente = await this.persistencia.obtenerClonPorId(id);
            if(clonExistente === null) {
                throw new NotFoundError('El clon que desea eliminar no existe');
            }
            await this.persistencia.eliminarClon(clonExistente.obtenerClonId()!);

        } catch (error) {
            throw error;
        }
    }

    // Este método se encarga de actualizar un clon en la base de datos
    async actualizarClon(clon: Partial<ClonDTO> & {id: string}): Promise<Clon> {
        try {
            const clonExistente = await this.persistencia.obtenerClonPorId(clon.id!);
            if(clonExistente === null) {
                throw new NotFoundError('El clon que desea actualizar no existe');
            }

            if(clon.variedad) {
                const variedadclonExistente = await this.plantaPersistencia.buscarPorVariedad(clon.variedad);

                if(variedadclonExistente === null) {
                    throw new NotFoundError('La variedad proporcionada no existe');
                }

                clonExistente.cambiarVariedadClon(clon.variedad!);
            }

            if(clon.nombre_clon) {
                const nombreclonExistente = await this.persistencia.buscarClonPorNombre(clon.nombre_clon);
                if(nombreclonExistente !== null) {
                    throw new DuplicateEntryError('Ya existe un clon con el nombre proporcionado, si desea actualizarlo, por favor dirijase al clon correspondiente');
                }
                clonExistente.cambiarNombreClon(clon.nombre_clon!);
            } 


            if(clon.origen) {
                clonExistente.cambiarOrigenClon(clon.origen!);
            }

            if(clon.descripcion) {
                clonExistente.cambiarDescripcionClon(clon.descripcion!);
            }
            
            return await this.persistencia.actualizarClon(clonExistente);

        } catch (error) {
            throw error;
        }
    }
}