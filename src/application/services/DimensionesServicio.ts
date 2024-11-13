// Servicio de la entidad Dimensiones que se encarga de la lógica de negocio de las dimensiones de los clones y de la comunicación con la capa de persistencia

import { Dimensiones } from "../../domain/models/Dimensiones";
import { DatabaseAdapter } from "../../infrastructure/adapters/MySqlAdapter";
import { DimensionesEntity } from "../../infrastructure/entities/DimensionesEntity";
import { DuplicateEntryError, NotFoundError } from "../../infrastructure/errors/CustomErrors";
import { DimensionesPersistencia } from "../../infrastructure/persistence/dimensiones/DimensionesPersistencia";
import { DimensionesDTO } from "../dtos/Dimensiones_dto";
import path from 'path';
import { ImageManager } from "./ImageManager";


export class DimensionesServicio {
    private persistencia: DimensionesPersistencia
    constructor(){
        this.persistencia = new DimensionesPersistencia(new DatabaseAdapter());
    }

    // Método para crear dimensiones
    async crearDimensiones(dimensiones: DimensionesDTO): Promise<Dimensiones> {
        try {
            const dimensionesExistentes = await this.persistencia.obtenerDimensionesPorNombreClon(dimensiones.nombre_clon);
            if (dimensionesExistentes !== null) {
                throw new DuplicateEntryError("Dimensiones ya existentes, si desea modificar las dimensiones, por favor actualice los datos correspondientes al clon");
            }
            const dimensionesEntidad = new DimensionesEntity(dimensiones.nombre_clon, dimensiones.altura_maxima, dimensiones.diametro, dimensiones.imagenes);

            const datos = new Dimensiones(dimensionesEntidad.obtenerNombreClon(), dimensionesEntidad.obtenerAlturaMaxima(), dimensionesEntidad.obtenerDiametro(), dimensionesEntidad.obtenerImagenes(), dimensionesEntidad.obtenerId());

            return await this.persistencia.almacenarDimensiones(datos);
        } catch (error) {
            throw error;
        }
    }

    // Método para actualizar dimensiones
    async actualizarDimensiones(dimensiones: Partial<DimensionesDTO> & {id: string}): Promise<Dimensiones> {
        try {
            const dimensionesExistentes = await this.persistencia.obtenerDimensionesPorId(dimensiones.id);

            if (dimensionesExistentes === null) {
                throw new NotFoundError("Dimensiones no encontradas");
            }

            if(dimensiones.nombre_clon) {
                // verificar si el nombre de clon ya existe

                const clonExistente = await this.persistencia.obtenerDimensionesPorNombreClon(dimensiones.nombre_clon);

                if(clonExistente !== null) {
                    throw new DuplicateEntryError("Ya existe un clon con el nombre proporcionado, si desea modificar las dimensiones, por favor dirijase al clon correspondiente");
                }

                dimensionesExistentes.cambiarNombreClon(dimensiones.nombre_clon);
            }

            if(dimensiones.altura_maxima) {
                dimensionesExistentes.cambiarAlturaMaxima(dimensiones.altura_maxima);
            }

            if(dimensiones.diametro) {
                dimensionesExistentes.cambiarDiametro(dimensiones.diametro);
            }

            const datos = new Dimensiones(dimensionesExistentes.obtenerNombreClon(), dimensionesExistentes.obtenerAlturaMaxima(), dimensionesExistentes.obtenerDiametro(), dimensionesExistentes.obtenerImagenes(), dimensionesExistentes.obtenerId());

            return await this.persistencia.actualizarDimensiones(datos);

            
        } catch (error) {
            throw error;
        }
    }

    // Método para actualizar las imagenes
    async actualizarImagenes(dimensiones: Partial<DimensionesDTO>): Promise<Dimensiones> {

        try {
            // verificar si las dimensiones existen
            const dimensionesExistentes = await this.persistencia.obtenerDimensionesPorNombreClon(dimensiones.nombre_clon!);

            if (dimensionesExistentes === null) {
                throw new NotFoundError("El clon no existe, por favor verifique el nombre del clon");
            }

            // eliminar las imagenes anteriores en el almacenamiento en la nube 
            // encontrar las imagenes anteriores por nombre de la imagen sin extension ni ruta

            const {jpg} = dimensionesExistentes.obtenerImagenes();

            const urlExtension = path.basename(jpg); // Obtiene el nombre del archivo con extensión
            const urlName = path.parse(urlExtension).name; // Obtiene el nombre sin la extensión

            const eliminarImagen = new ImageManager();
            await eliminarImagen.eliminarImagenes(urlName);

            // Actualizar las imagenes en la base de datos

            dimensionesExistentes.cambiarImagenes(dimensiones.imagenes!);


            const datos = new Dimensiones(dimensionesExistentes.obtenerNombreClon(), dimensionesExistentes.obtenerAlturaMaxima(), dimensionesExistentes.obtenerDiametro(), dimensionesExistentes.obtenerImagenes(), dimensionesExistentes.obtenerId());

            return await this.persistencia.actualizarDimensiones(datos);

        } catch (error) {
            throw error
        }
    }
}