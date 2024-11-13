    // Servicio de usos que se encarga de la lógica de negocio de la entidad usos y de la comunicación con la capa de persistencia

    import { Usos } from "../../domain/models/Usos";
    import { DatabaseAdapter } from "../../infrastructure/adapters/MySqlAdapter";
    import { UsosEntity } from "../../infrastructure/entities/UsosEntity";
    import { BadRequestError, DuplicateEntryError } from "../../infrastructure/errors/CustomErrors";
    import { UsosPersistencia } from "../../infrastructure/persistence/usos/UsosPersistencia";
    import { UsosDTO } from "../dtos/usos_dto";

    export class UsosServicio {
        private persistencia: UsosPersistencia
        constructor() {
            this.persistencia = new UsosPersistencia(new DatabaseAdapter());
        }

        // Método para crear usos
        async crearUsos(usos: UsosDTO) : Promise<Usos> {
            try {
                const usosExistentes = await this.persistencia.obtenerUsosPorNombreClon(usos.nombre_clon)
                if(usosExistentes !== null) {
                    throw new DuplicateEntryError('El clon ya tiene usos asignados, si desea modificarlos, por favor actualice los datos correspondientes al clon')
                }

                const usosEntidad = new UsosEntity(usos.nombre_clon, usos.usos, usos.expansion_geografica)

                const datos = new Usos(usosEntidad.obtenerNombreClon(), usosEntidad.obtenerUsos(), usosEntidad.obtenerExpansionGeografica())

                return await this.persistencia.almacenarUsos(datos)

            } catch (error) {
                throw error;
            }
        }

        // Método para actualizar usos
        async actualizarUsos(usos: Partial<UsosDTO> & { id: string }): Promise<Usos> {
            try {
                const usosExistentes = await this.persistencia.obtenerUsosPorId(usos.id)
                if(usosExistentes === null) {
                    throw new BadRequestError('El uso que intenta modificar no existe')
                }       

                if(usos.nombre_clon) {
                    const verificarSiExisteNombreClon = await this.persistencia.obtenerUsosPorNombreClon(usos.nombre_clon)

                    if(verificarSiExisteNombreClon !== null) {
                        throw new DuplicateEntryError('El clon ya tiene usos asignados, si desea modificarlos, por favor actualice los datos correspondientes al clon')
                    }

                    usosExistentes.cambiarNombreClon(usos.nombre_clon)
                }

                if(usos.usos) {
                    usosExistentes.cambiarUsos(usos.usos)
                }

                if(usos.expansion_geografica) {
                    usosExistentes.cambiarExpansionGeografica(usos.expansion_geografica)
                }

                return await this.persistencia.actualizarUsos(usosExistentes)
            } catch (error) {
                throw error
            }
        }
    }