import { Model, DataTypes } from "sequelize";
import { BadRequestError } from "../../errors/CustomErrors";
import { ClonSequilize } from "./ClonModel";



export class CondicionesClimaticasSequelize extends Model {
    
        static async initModel(sequelize: any) {
            try {
                CondicionesClimaticasSequelize.init(
                    {
                        id: {
                            type: DataTypes.UUID,
                            primaryKey: true,
                            defaultValue: DataTypes.UUIDV4,
                          },
                        nombre_clon: {
                            type: DataTypes.STRING,
                            allowNull: false,
                        },
                        rango_altitudinal: {
                            type: DataTypes.STRING,
                            allowNull: false,
                        },
                        rango_luminosidad: {
                            type: DataTypes.STRING,
                            allowNull: false,
                        },
                        temperatura: {
                            type: DataTypes.STRING,
                            allowNull: false,
                        },
                        precipitacion: {
                            type: DataTypes.STRING,
                            allowNull: false,
                        },
                        humedad_relativa: {
                            type: DataTypes.STRING,
                            allowNull: false,
                        },
                    },
                    {
                        sequelize,
                        modelName: 'CondicionesClimaticas',
                        tableName: 'CondicionesClimaticas',
                        timestamps: false // Desactivar los campos createdAt y updatedAt
                    }
                )

                ClonSequilize.hasOne(CondicionesClimaticasSequelize, { foreignKey: 'nombre_clon', sourceKey: 'nombre_clon', as: 'CondicionesClimaticas' });
                CondicionesClimaticasSequelize.belongsTo(ClonSequilize, { foreignKey: 'nombre_clon', targetKey: 'nombre_clon', as: 'Clones' });

            } catch (error) {
                throw new BadRequestError('Error al inicializar el modelo de condiciones climáticas.');
            }
        }
}