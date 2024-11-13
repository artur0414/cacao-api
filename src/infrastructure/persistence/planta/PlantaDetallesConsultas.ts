// Persistencia de las consultas de las plantas, estás consultas son más complejas y requieren de más de una tabla para obtener la información requerida, es por ello que se hace uso de sequelize para realizar las consultas.

import { Op } from "sequelize";
import { SequelizeAdapter } from "../../adapters/SequelizeAdapter";
import { CaracteristicaSequelize } from "../../database/Sequelize models/CaracteristicaModel";
import { ClonSequilize } from "../../database/Sequelize models/ClonModel";
import { CondicionesClimaticasSequelize } from "../../database/Sequelize models/CondicionesClimaticasModel";
import { DimensionesSequelize } from "../../database/Sequelize models/DimensionesModel";
import { MantenimientoSequelize } from "../../database/Sequelize models/MantenimientoModel";
import { PlagasEnfermedadesSequelize } from "../../database/Sequelize models/PlagasEnfermedadesModel";
import { CacaoPlanta } from "../../database/Sequelize models/PlantaModel";
import { UsosSequelize } from "../../database/Sequelize models/UsosModel";
import { DatabaseError, DatabaseErrorHandler } from "../../errors/CustomErrors";


export class PlantaDetallesConsultas {
    private sequelizeAdapter: SequelizeAdapter;

    constructor() {
        this.sequelizeAdapter = new SequelizeAdapter();
    }

    private async inicializarModelos(sequelize: any) {
        await CacaoPlanta.initModel(sequelize);
        await ClonSequilize.initModel(sequelize, true);
        await CaracteristicaSequelize.initModel(sequelize);
        await UsosSequelize.initModel(sequelize);
        await CondicionesClimaticasSequelize.initModel(sequelize);
        await DimensionesSequelize.initModel(sequelize);
        await MantenimientoSequelize.initModel(sequelize);
        await PlagasEnfermedadesSequelize.initModel(sequelize);
    }

    // Método para ejecutar la consulta con las asociaciones
    private async ejecutarQueryConAsociacion(query: any): Promise<any> {
        try {
            const result = await query;
            if (result.length === 0) {
                return null;
            }
            return result;
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al ejecutar la consulta con las asociaciones.', 'PlantaDetallesConsultas').procesarError();
        } finally {
            this.closeConnection();
        }
    }


    // Método para obtener todas las plantas con sus clones y tablas relacionadas de los clones

    async obtenerPlantasConClones(page ?: number, limit ?: number) {
        try {
            const offset = limit ? ((page ?? 1) - 1) * limit : 0;
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await this.inicializarModelos(sequelize);

            // Obtener todas las plantas con sus clones

            const query = await CacaoPlanta.findAll({
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones',
                        include: [
                            { model: CaracteristicaSequelize, as: 'Caracteristicas'},
                            { model: UsosSequelize , as: 'Usos'},
                            { model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                            { model: DimensionesSequelize, as: 'Dimensiones'},
                            { model: MantenimientoSequelize, as: 'Mantenimiento'},
                            { model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                        ]
                    }
                ], 
                offset: offset,
                limit: limit ? limit : undefined
            });

            return this.ejecutarQueryConAsociacion(query);

        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaDetallesConsultas').procesarError();            
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener todas las plantas con sus clones filtrando por especie

    async obtenerPlantasConClonesPorEspecie(especie: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            await this.inicializarModelos(sequelize);

            const query = await CacaoPlanta.findAll({
                where: {especie: especie},
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones',
                        include: [
                            { model: CaracteristicaSequelize, as: 'Caracteristicas'},
                            { model: UsosSequelize , as: 'Usos'},
                            { model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                            { model: DimensionesSequelize, as: 'Dimensiones'},
                            { model: MantenimientoSequelize, as: 'Mantenimiento'},
                            { model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                        ]
                    }
                ]
            });

            return this.ejecutarQueryConAsociacion(query);

        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaDetallesConsultas').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener todas las plantas con sus clones filtrando por variedad

    async obtenerPlantasConClonesPorVariedad(variedad: string, page ?: number, limit ?: number) {
        try {
            const offset = limit ? ((page ?? 1) - 1) * limit : 0;
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            await this.inicializarModelos(sequelize);

            const query = await CacaoPlanta.findAll({
                where: { variedad: variedad},
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones',
                        include: [
                            { model: CaracteristicaSequelize, as: 'Caracteristicas'},
                            { model: UsosSequelize , as: 'Usos'},   
                            { model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                            { model: DimensionesSequelize, as: 'Dimensiones'},
                            { model: MantenimientoSequelize, as: 'Mantenimiento'},
                            { model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                        ]
                    }
                ], 
                offset: offset,
                limit: limit ? limit : undefined
            });

            return this.ejecutarQueryConAsociacion(query);

        } catch (error) {
            console.log("errir acá")
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaDetallesConsultas').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener todas las plantas filtradas por nombre de clon

    async obtenerPlantasConClonesPorNombreClon(nombre: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            await this.inicializarModelos(sequelize);

            const query = await CacaoPlanta.findAll({
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones',
                        where: {nombre_clon: nombre},
                        include: [
                            { model: CaracteristicaSequelize, as: 'Caracteristicas'},
                            { model: UsosSequelize , as: 'Usos'},
                            { model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                            { model: DimensionesSequelize, as: 'Dimensiones'},
                            { model: MantenimientoSequelize, as: 'Mantenimiento'},
                            { model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                        ]
                    }
                ]
            });

            return this.ejecutarQueryConAsociacion(query);

        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaDetallesConsultas').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener todas las plantas con sus clones filtrando por características

    async obtenerPlantasConClonesPorCaracteristicas(caracteristica: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            await this.inicializarModelos(sequelize);
            const caracteristicaJson = JSON.stringify(caracteristica);

            const query = await CacaoPlanta.findAll({
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones',
                        include: [
                            {
                                model: CaracteristicaSequelize, as: 'Caracteristicas',
                                where: sequelize.literal(
                                    `JSON_CONTAINS(caracteristicas, ${sequelize.escape(caracteristicaJson)})`
                                )
            
                            },
                            { model: UsosSequelize , as: 'Usos'},
                            { model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                            { model: DimensionesSequelize, as: 'Dimensiones'},
                            { model: MantenimientoSequelize, as: 'Mantenimiento'},
                            { model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades'}
                        ], 
                        where: {
                            nombre_clon: {
                              [Op.in]: sequelize.literal(`(SELECT nombre_clon FROM Caracteristica WHERE JSON_CONTAINS(caracteristicas, ${sequelize.escape(caracteristicaJson)}))`) 
                            }
                          },
                    }
                ]
            });

            return this.ejecutarQueryConAsociacion(query);

        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaDetallesConsultas').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener todas las plantas con sus clones filtrando por usos

    async obtenerPlantasConClonesPorUsos(usos: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            await this.inicializarModelos(sequelize);

            const usoJson = JSON.stringify(usos);
            const query = await CacaoPlanta.findAll({
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones',
                        include: [
                            { model: CaracteristicaSequelize, as: 'Caracteristicas' },
                            { model: UsosSequelize, as: 'Usos',
                                where: {
                                    where: sequelize.literal(`JSON_CONTAINS(usos, ${sequelize.escape(usoJson)})`), 
                                }
                            },
                            { model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas' },
                            { model: DimensionesSequelize, as: 'Dimensiones' },
                            { model: MantenimientoSequelize, as: 'Mantenimiento' },
                            { model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades' }
                        ], 
                        where: {
                            nombre_clon: {
                              [Op.in]: sequelize.literal(`(SELECT nombre_clon FROM Usos WHERE JSON_CONTAINS(usos, ${sequelize.escape(usoJson)}))`) 
                            }
                        },
                    }
                ], 
            });

            return this.ejecutarQueryConAsociacion(query);

        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaDetallesConsultas').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener todas las plantas con sus clones filtrando por expansión geográfica

    async obtenerPlantasConClonesPorExpGeo(expGeo: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            await this.inicializarModelos(sequelize);

            const expoGeoJson = JSON.stringify(expGeo);

            const query = await CacaoPlanta.findAll({
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones',
                        include: [
                            { model: CaracteristicaSequelize, as: 'Caracteristicas' },
                            { model: UsosSequelize, as: 'Usos', 
                            where: sequelize.literal(`JSON_CONTAINS(expansion_geografica, ${sequelize.escape(expoGeoJson)})`)
                            },
                            { model: CondicionesClimaticasSequelize, as: 'CondicionesClimaticas'},
                            { model: DimensionesSequelize, as: 'Dimensiones' },
                            { model: MantenimientoSequelize, as: 'Mantenimiento' },
                            { model: PlagasEnfermedadesSequelize, as: 'PlagasEnfermedades' }
                        ], 
                        where: {
                            nombre_clon: {
                              [Op.in]: sequelize.literal(`(SELECT nombre_clon FROM Usos WHERE JSON_CONTAINS(expansion_geografica,${sequelize.escape(expoGeoJson)}))`) 
                            }
                        },
                    }
                ], 
            });

            return this.ejecutarQueryConAsociacion(query);

        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaDetallesConsultas').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para cerrar la conexión 
    private closeConnection() {
        this.sequelizeAdapter.close();
    }
}