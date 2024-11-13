import { Model, DataTypes } from "sequelize";
import { BadRequestError } from "../../errors/CustomErrors";
import { ClonSequilize } from "./ClonModel";


export class PlagasEnfermedadesSequelize extends Model {

    static async initModel(sequelize: any) {
        try {
            PlagasEnfermedadesSequelize.init(
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
                    asociaciones_plagas_enfermedades: {
                        type: DataTypes.JSONB,
                        allowNull: false,
                    },
                },
                {
                    sequelize,
                    modelName: 'PlagasEnfermedades',
                    tableName: 'PlagasEnfermedades',
                    timestamps: false // Desactivar los campos createdAt y updatedAt
                }
            )

            ClonSequilize.hasOne(PlagasEnfermedadesSequelize, { foreignKey: 'nombre_clon', sourceKey: 'nombre_clon', as: 'PlagasEnfermedades' });
            PlagasEnfermedadesSequelize.belongsTo(ClonSequilize, { foreignKey: 'nombre_clon', targetKey: 'nombre_clon', as: 'Clones' });

        } catch (error) {
            throw new BadRequestError('Error al inicializar el modelo de plagas y enfermedades.');
        }
    }

}