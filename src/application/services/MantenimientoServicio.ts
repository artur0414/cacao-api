// Servicio para la lógica de negocio de mantenimientos de clones, se usa como puente entre el controlador y la persistencia

import { Mantenimiento } from "../../domain/models/Mantenimiento";
import { DatabaseAdapter } from "../../infrastructure/adapters/MySqlAdapter";
import { MantenimientoEntity } from "../../infrastructure/entities/MantenimientoEntity";
import { DuplicateEntryError, NotFoundError } from "../../infrastructure/errors/CustomErrors";
import { MantenimientoPersistencia } from "../../infrastructure/persistence/mantenimiento/MantenimientoPersistencia";
import { MantenimientoDTO } from "../dtos/mantenimiento_dto";

export class MantenimientoServicio {

    private persistencia: MantenimientoPersistencia;

    constructor() {
        this.persistencia = new MantenimientoPersistencia(new DatabaseAdapter());
    }

    // Método para crear un mantenimiento
    crearMantenimiento = async (mantenimiento: MantenimientoDTO): Promise<Mantenimiento> => {
        try {
            // Código para crear un mantenimiento
            const mantenimientoExistente = await this.persistencia.obtenerMantenimientoPorNombreClon(mantenimiento.nombre_clon);
            if(mantenimientoExistente !== null) {
                throw new DuplicateEntryError('Ya existe un mantenimiento para el clon proporcionado, si desea modificar el mantenimiento, por favor actualice los datos correspondientes al clon');
            }
            const mantenimientoEntidad = new MantenimientoEntity(mantenimiento.nombre_clon, mantenimiento.tipo_abonos, mantenimiento.frecuencia_podas);

            const datos = new Mantenimiento(mantenimientoEntidad.obtenerNombreClon(), mantenimientoEntidad.obtenerTipoAbonos(), mantenimientoEntidad.obtenerFrecuenciaPodas(), mantenimientoEntidad.obtenerId()!);

            return await this.persistencia.almacenarMantenimiento(datos);
        } catch (error) {
            throw error;
        }

    }

    // Método para actualizar un mantenimiento
    actualizarMantenimiento = async (mantenimiento: Partial<MantenimientoDTO> & { id: string }): Promise<Mantenimiento> => {
        try {
            const mantenimientoExistente = await this.persistencia.obtenerMantenimientoPorId(mantenimiento.id);

            if(mantenimientoExistente === null) {
                throw new NotFoundError('No existen mantenimientos con el id proporcionado, por favor, verifique los datos');
            }
            

            if(mantenimiento.nombre_clon) {
                const verificarSiExisteNombreClon = await this.persistencia.obtenerMantenimientoPorNombreClon(mantenimiento.nombre_clon);
                if(verificarSiExisteNombreClon !== null) {
                    throw new DuplicateEntryError('Ya existe un mantenimiento con el nombre de clon proporcionado, si desea modificar el mantenimiento, por favor dirijase al clon correspondiente');
                }
                mantenimientoExistente.cambiarNombreClon(mantenimiento.nombre_clon);
            }

            if(mantenimiento.tipo_abonos) {
                mantenimientoExistente.cambiarTipoAbonos(mantenimiento.tipo_abonos);
            }

            if(mantenimiento.frecuencia_podas) {
                mantenimientoExistente.cambiarFrecuenciaPodas(mantenimiento.frecuencia_podas);
            }

            return await this.persistencia.actualizarMantenimiento(mantenimientoExistente);

        } catch (error) {
            throw error;
        }
    }
}