//Persistencia de las consultas de las plantas, estás consultas son más complejas y requieren de más de una tabla para obtener la información requerida, es por ello que se hace uso de sequelize para realizar las consultas.

import { SequelizeAdapter } from "../../adapters/SequelizeAdapter";
import { ClonSequilize } from "../../database/Sequelize models/ClonModel";
import { CacaoPlanta } from "../../database/Sequelize models/PlantaModel";
import { BadRequestError, DatabaseErrorHandler } from "../../errors/CustomErrors";

export class PlantaConsultasPersistencias {
    private sequelizeAdapter: SequelizeAdapter;

    constructor() {
        this.sequelizeAdapter = new SequelizeAdapter(); 
    }

    // Método para obtener todas las plantas con sus clones
    async obtenerPlantasConClones() {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await CacaoPlanta.initModel(sequelize);
            await ClonSequilize.initModel(sequelize, true);

            // Obtener todas las plantas con sus clones
            const plantasConClones = await CacaoPlanta.findAll({
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones'
                    }
                ]
            });

            if(plantasConClones.length === 0){
                return null
            }

            return plantasConClones;
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaConsultasPersistencias').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener todas las plantas con sus clones filtrando por especie
    async obtenerPlantasConClonesPorEspecie(especie: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await CacaoPlanta.initModel(sequelize);
            await ClonSequilize.initModel(sequelize, true);

            // Obtener todas las plantas con sus clones
            const plantasConClones = await CacaoPlanta.findAll({
                where: {
                    especie: especie
                },
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones'
                    }
                ]
            });

            if(plantasConClones.length === 0){
                return null
            }

            return plantasConClones;
        } catch (error: any) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaConsultasPersistencias').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener todas las plantas con sus clones filtrando por variedad
    async obtenerPlantasConClonesPorVariedad(variedad: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await CacaoPlanta.initModel(sequelize);
            await ClonSequilize.initModel(sequelize, true);

            // Obtener todas las plantas con sus clones
            const plantasConClones = await CacaoPlanta.findAll({
                where: {
                    variedad: variedad
                },
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones'
                    }
                ]
            });

            if(plantasConClones.length === 0){
                return null
            }

            return plantasConClones;
        } catch (error: any) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaConsultasPersistencias').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener todas las plantas con sus clones filtrando por nombre de clon
    async obtenerPlantasConClonesPorNombre(nombre: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await CacaoPlanta.initModel(sequelize);
            await ClonSequilize.initModel(sequelize, true);

            // Obtener todas las plantas con sus clones
            const plantasConClones = await CacaoPlanta.findAll({
  
                include: [
                    {
                        model: ClonSequilize,
                        as: 'Clones',
                        where: {
                            nombre_clon: nombre
                        }
                    }
                ]
            });

            if(plantasConClones.length === 0){
                return null
            }

            return plantasConClones;
        } catch (error: any) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las plantas con sus clones.', 'PlantaConsultasPersistencias').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener las estadisticas de los clones por variedad 

    async obtenerEstadisticasPlantasPorVariedad(variedad: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await CacaoPlanta.initModel(sequelize);
            await ClonSequilize.initModel(sequelize, true);

            const estadisticasPlantas = await ClonSequilize.findAll({
                attributes: ['variedad', [sequelize.fn('COUNT', 'variedad'), 'total_clones']],
                where: {
                    variedad: variedad
                },
                group: ['variedad']
            });
        

            if(estadisticasPlantas.length === 0){
                return null
            }

            return estadisticasPlantas;
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las estadisticas de las plantas por variedad.', 'PlantaConsultasPersistencias').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para obtener las estadisticas de las plantas por especie

    async obtenerEstadisticasPlantasPorEspecie(especie: string) {
        try {
            const sequelize = this.sequelizeAdapter.obtenerSequelize();
            // Inicializar los modelos
            await CacaoPlanta.initModel(sequelize);
            await ClonSequilize.initModel(sequelize, true);

            // Obtener las estadisticas de las plantas por especie
            const estadisticasPlantas = await CacaoPlanta.findAll({
                attributes: ['especie', [sequelize.fn('COUNT', 'especie'), 'total_variedades']],
                where: {
                    especie: especie
                },
                group: ['especie']
            });

            if(estadisticasPlantas.length === 0){
                return null
            }

            return estadisticasPlantas;
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al obtener las estadisticas de las plantas por especie.', 'PlantaConsultasPersistencias').procesarError();
        } finally {
            this.closeConnection();
        }
    }

    // Método para cerrar la conexión 
    private closeConnection() {
        this.sequelizeAdapter.close();
    }
}