import { Model, DataTypes } from "sequelize";
import { BadRequestError } from "../../errors/CustomErrors";
import { ClonSequilize } from "./ClonModel";


export class MantenimientoSequelize extends Model {
    static async initModel(sequelize: any) {
        try {
            MantenimientoSequelize.init(
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
                    tipo_abonos: {
                        type: DataTypes.JSONB,
                        allowNull: false,
                    },
                    frecuencia_podas: {
                        type: DataTypes.STRING,
                    },
                }, 
                {
                    sequelize,
                    modelName: 'Mantenimiento',
                    tableName: 'Mantenimiento',
                    timestamps: false // Desactivar los campos createdAt y updatedAt
                }
            )

            ClonSequilize.hasOne(MantenimientoSequelize, { foreignKey: 'nombre_clon', sourceKey: 'nombre_clon'});
            MantenimientoSequelize.belongsTo(ClonSequilize, { foreignKey: 'nombre_clon', targetKey: 'nombre_clon', as: 'Clones' });

        } catch (error) {
            throw new BadRequestError('Error al inicializar el modelo de mantenimiento.');
        }
    }
}