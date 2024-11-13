// Servicio de Plagas y Enfermedades que se encarga de la lógica de negocio de las plagas y enfermedades y sirve de intermediario entre el controlador y la persistencia

import { PlagasEnfermedades } from "../../domain/models/PlagasEnfermedades";
import { DatabaseAdapter } from "../../infrastructure/adapters/MySqlAdapter";
import { PlagasEnfermedadesEntity } from "../../infrastructure/entities/PlagasEnfermedadesEntity";
import { BadRequestError, DuplicateEntryError } from "../../infrastructure/errors/CustomErrors";
import { PlagasEnfermedadesPersistencia } from "../../infrastructure/persistence/plagas enfermedades/PlagasEnfermedadesPersistencia";
import { PlagasEnfermedadesDTO } from "../dtos/PlagasEnfermedades_dto";


export class PlagasEnfermedadesServicio{
    private persistencia: PlagasEnfermedadesPersistencia;

    constructor (){
        this.persistencia = new PlagasEnfermedadesPersistencia(new DatabaseAdapter());
    }

    // Método para crear plagas y enfermedades
    async crearPlagaEnfermedad(plagaEnfermedad: PlagasEnfermedadesDTO): Promise<PlagasEnfermedades>{
        try{
            const plagaEnfermedadExistentes = await this.persistencia.obtenerPlagaEnfermedadPorNombreClon(plagaEnfermedad.nombre_clon);

            if(plagaEnfermedadExistentes !== null){
                throw new DuplicateEntryError('El clon ya tiene plagas y enfermedades asignadas, si desea modificarlas, por favor actualice los datos correspondientes al clon');
            }

            const plagaEnfermedadEntidad = new PlagasEnfermedadesEntity(plagaEnfermedad.nombre_clon, plagaEnfermedad.asociaciones_plagas_enfermedades);

            const datos = new PlagasEnfermedades(plagaEnfermedadEntidad.obtenerNombreClon(), plagaEnfermedadEntidad.obtenerAsociacionesPlagasEnfermedades());

            return await this.persistencia.almacenarPlagaEnfermedad(datos);

        } catch (error) {
            throw error;
        }
    }

    // Método para actualizar plagas y enfermedades
    async actualizarPlagasEnfermedades(plagaEnfermedad: Partial<PlagasEnfermedadesDTO> & { id: string }): Promise<PlagasEnfermedades>{
        try {
            const plagaEnfermedadExistentes = await this.persistencia.obtenerPlagaEnfermedadPorId(plagaEnfermedad.id);

            if(plagaEnfermedadExistentes === null){
                throw new BadRequestError('La plaga/enfermedad que intenta modificar no existe');
            }

            if(plagaEnfermedad.nombre_clon){
                const verificarSiExisteNombreClon = await this.persistencia.obtenerPlagaEnfermedadPorNombreClon(plagaEnfermedad.nombre_clon);

                if(verificarSiExisteNombreClon !== null){
                    throw new Error('El clon ya tiene plagas y enfermedades asignadas, si desea modificarlas, por favor, utilice la opción de modificar plagas y enfermedades');
                }

                plagaEnfermedadExistentes.cambiarNombreClon(plagaEnfermedad.nombre_clon!);
            }

            if(plagaEnfermedad.asociaciones_plagas_enfermedades){
                plagaEnfermedadExistentes.cambiarAsociacionesPlagasEnfermedades(plagaEnfermedad.asociaciones_plagas_enfermedades);
            }

            return await this.persistencia.actualizarPlagaEnfermedad(plagaEnfermedadExistentes);

        } catch (error) {
            throw error;
        }
    }
}