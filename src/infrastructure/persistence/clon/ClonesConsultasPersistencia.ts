// Persistencia de las consultas de los clones, estás consultas se encargan de obtener los clones con sus detalles de la base de datos, es por ello que se hace uso de sequelize para realizar las consultas a la base de datos.

import { Op } from "sequelize";
import { SequelizeAdapter } from "../../adapters/SequelizeAdapter";
import { CaracteristicaSequelize } from "../../database/Sequelize models/CaracteristicaModel";
import { ClonSequilize } from "../../database/Sequelize models/ClonModel";
import { CondicionesClimaticasSequelize } from "../../database/Sequelize models/CondicionesClimaticasModel";
import { DimensionesSequelize } from "../../database/Sequelize models/DimensionesModel";
import { MantenimientoSequelize } from "../../database/Sequelize models/MantenimientoModel";
import { PlagasEnfermedadesSequelize } from "../../database/Sequelize models/PlagasEnfermedadesModel";
import { UsosSequelize } from "../../database/Sequelize models/UsosModel";
import { DatabaseError, DatabaseErrorHandler } from "../../errors/CustomErrors";


export class ClonesConsultasPersistencia {
    private sequelizeAdapter: SequelizeAdapter;

    constructor() {
        this.sequelizeAdapter = new SequelizeAdapter();
    }

    // Método que se encarga de inicializar los modelos de sequelize
    private async inicializarModelos(sequelize: any) {
        await ClonSequilize.initModel(sequelize, false);
        await CaracteristicaSequelize.initModel(sequelize);
        await UsosSequelize.initModel(sequelize);
        await CondicionesClimaticasSequelize.initModel(sequelize);
        await DimensionesSequelize.initModel(sequelize);
        await MantenimientoSequelize.initModel(sequelize);
        await PlagasEnfermedadesSequelize.initModel(sequelize);
    }

    // Método que se encarga de ejecutar la consulta a la base de datos
    private async ejecutarQueryConAsociacion(query: any): Promise<any> {
        try {
            const result = await query;
            if (result.length === 0) {
                return null;
            }
            return result;
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones', 'ClonesConsultasPersistencia').procesarError();
        } finally {
            this.closeConnection();
        }
    }




    // Método que se encarga de obtener los clones con sus detalles
    async obtenerClonesConDetalles(page ?: number, limit ?: number) {
        try {
            const offset = limit ? ((page ?? 1) - 1) * limit : 0;
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await this.inicializarModelos(sequelize);

            const query = await ClonSequilize.findAll({
                include: [
                    {model: CaracteristicaSequelize, as: 'Caracteristicas'},
                    {model: UsosSequelize, as: 'Usos'},
                    {model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                    {model: DimensionesSequelize, as: 'Dimensiones'},
                    {model: MantenimientoSequelize, as: 'Mantenimiento'},
                    {model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                ],
                offset: offset,
                limit: limit ? limit : undefined
            });


            return this.ejecutarQueryConAsociacion(query);
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones', 'ClonesConsultasPersistencia').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método que se encarga de obtener los clones con sus detalles por nombre de clon

    async obtenerClonesConDetallesPorNombreClon(nombre_clon: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await this.inicializarModelos(sequelize);

            const query = await ClonSequilize.findAll({
                where: {
                    nombre_clon: nombre_clon
                },
                include: [
                    {model: CaracteristicaSequelize, as: 'Caracteristicas'},
                    {model: UsosSequelize, as: 'Usos'},
                    {model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                    {model: DimensionesSequelize, as: 'Dimensiones'},
                    {model: MantenimientoSequelize, as: 'Mantenimiento'},
                    {model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                ]
            });

            return this.ejecutarQueryConAsociacion(query);
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones', 'ClonesConsultasPersistencia').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método que se encarga de obtener los clones con sus detalles por variedad

    async obtenerClonesConDetallesPorVariedad(variedad: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await this.inicializarModelos(sequelize);

            const query = await ClonSequilize.findAll({
                where: {
                    variedad: variedad
                },
                include: [
                    {model: CaracteristicaSequelize, as: 'Caracteristicas'},
                    {model: UsosSequelize, as: 'Usos'},
                    {model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                    {model: DimensionesSequelize, as: 'Dimensiones'},
                    {model: MantenimientoSequelize, as: 'Mantenimiento'},
                    {model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                ]
            });

            return this.ejecutarQueryConAsociacion(query);
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones', 'ClonesConsultasPersistencia').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método que se encarga de obtener los clones con sus detalles por caracteristicas

    async obtenerClonesConDetallesPorCaracteristicas(caracteristica: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await this.inicializarModelos(sequelize);
            const caracteristicaJson = JSON.stringify(caracteristica);

            const query = await ClonSequilize.findAll({
                include: [
                    {
                        model: CaracteristicaSequelize,
                        as: 'Caracteristicas',
                        where: sequelize.literal(
                            `JSON_CONTAINS(caracteristicas, ${sequelize.escape(caracteristicaJson)})`
                        )
            },
                    {model: UsosSequelize, as: 'Usos'},
                    {model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                    {model: DimensionesSequelize, as: 'Dimensiones'},
                    {model: MantenimientoSequelize, as: 'Mantenimiento'},
                    {model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                ], 
                where: {
                    nombre_clon: {
                        [Op.in]: sequelize.literal(`(SELECT nombre_clon FROM Caracteristica WHERE JSON_CONTAINS(caracteristicas, ${sequelize.escape(caracteristicaJson)}))`) 
                    }
                }
            });

            return this.ejecutarQueryConAsociacion(query);
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones', 'ClonesConsultasPersistencia').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método que se encarga de obtener los clones con sus detalles por usos

    async obtenerClonesConDetallesPorUsos(usos: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await this.inicializarModelos(sequelize);
            const usoJson = JSON.stringify(usos);

            const query = await ClonSequilize.findAll({
                include: [
                    {model: CaracteristicaSequelize, as: 'Caracteristicas'},
                    {
                        model: UsosSequelize,
                        as: 'Usos',
                        where: sequelize.literal(`JSON_CONTAINS(usos, ${sequelize.escape(usoJson)})`), 
                    },
                    {model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                    {model: DimensionesSequelize, as: 'Dimensiones'},
                    {model: MantenimientoSequelize, as: 'Mantenimiento'},
                    {model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                ],
                where: {
                    nombre_clon: {
                      [Op.in]: sequelize.literal(`(SELECT nombre_clon FROM Usos WHERE JSON_CONTAINS(usos, ${sequelize.escape(usoJson)}))`) 
                    }
                },
            });

            return this.ejecutarQueryConAsociacion(query);
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones', 'ClonesConsultasPersistencia').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método que se encarga de obtener los clones con sus detalles por exposición geográfica

    async obtenerClonesConDetallesPorExposicionGeografica(expGeo: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await this.inicializarModelos(sequelize);

            const expoGeoJson = JSON.stringify(expGeo);

            const query = await ClonSequilize.findAll({
                include: [
                    {model: CaracteristicaSequelize, as: 'Caracteristicas'},
                    {model: UsosSequelize, as: 'Usos', 
                        where: sequelize.literal(`JSON_CONTAINS(expansion_geografica, ${sequelize.escape(expoGeoJson)})`)

                    },
                    {model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                    {model: DimensionesSequelize, as: 'Dimensiones'},
                    {model: MantenimientoSequelize, as: 'Mantenimiento'},
                    {model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                ],
                where: {
                    nombre_clon: {
                      [Op.in]: sequelize.literal(`(SELECT nombre_clon FROM Usos WHERE JSON_CONTAINS(expansion_geografica,${sequelize.escape(expoGeoJson)}))`) 
                    }
                },
            });

            return this.ejecutarQueryConAsociacion(query);
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones', 'ClonesConsultasPersistencia').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para cerrar la conexión con la base de datos

    private async closeConnection() {
        this.sequelizeAdapter.close();
    }
}