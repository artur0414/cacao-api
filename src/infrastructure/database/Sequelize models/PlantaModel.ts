// Modelo Sequilize de la tabla Planta


import { DataTypes, Model, Sequelize } from "sequelize";
import { BadRequestError } from "../../errors/CustomErrors";

export class CacaoPlanta extends Model {

    static async initModel(sequelize: Sequelize) {

        try {
            CacaoPlanta.init(
                {
                    id: {
                        type: DataTypes.UUID,
                        primaryKey: true,
                        defaultValue: DataTypes.UUIDV4,
                    },
                    especie: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    variedad: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                    },
                },
                {
                    sequelize, // Instancia de sequelize
                    modelName: 'CacaoPlanta',
                    tableName: 'CacaoPlanta',
                    timestamps: false // Desactivar los campos createdAt y updatedAt
                }
            );

        } catch (error) {
            throw new BadRequestError('Error al inicializar el modelo de la planta de cacao.');
        }
    }
}
