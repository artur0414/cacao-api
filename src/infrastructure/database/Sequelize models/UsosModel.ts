import { DataTypes, Model } from "sequelize";
import { BadRequestError } from "../../errors/CustomErrors";
import { ClonSequilize } from "./ClonModel";


export class UsosSequelize extends Model {
    static async initModel(sequelize: any) {
        try {
            UsosSequelize.init(
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
                    usos: {
                        type: DataTypes.JSONB,
                        allowNull: false,
                    },
                    expansion_geografica: {
                        type: DataTypes.JSONB,
                        allowNull: false,
                    },
                  },
                  {
                    sequelize,
                    modelName: 'Usos',
                    tableName: 'Usos',
                    timestamps: false // Desactivar los campos createdAt y updatedAt
                  }
            )

            ClonSequilize.hasOne(UsosSequelize, { foreignKey: 'nombre_clon', sourceKey: 'nombre_clon', as: 'Usos' });
            UsosSequelize.belongsTo(ClonSequilize, { foreignKey: 'nombre_clon', targetKey: 'nombre_clon', as: 'Clones' });
        } catch (error) {
            throw new BadRequestError('Error al inicializar el modelo de usos.');
        }
    }
}