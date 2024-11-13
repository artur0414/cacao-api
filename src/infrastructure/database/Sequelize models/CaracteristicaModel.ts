import { DataTypes, Model } from "sequelize";
import { BadRequestError } from "../../errors/CustomErrors";
import { ClonSequilize } from "./ClonModel";


export class CaracteristicaSequelize extends Model {

    static async initModel(sequelize: any) {
        try {
            CaracteristicaSequelize.init(
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
                    caracteristicas: {
                      type: DataTypes.JSONB,
                      allowNull: false,
                    },
                  },
                  {
                    sequelize,
                    modelName: 'Caracteristica',
                    tableName: 'Caracteristica',
                    timestamps: false // Desactivar los campos createdAt y updatedAt
                  }
            )

            ClonSequilize.hasOne(CaracteristicaSequelize, { foreignKey: 'nombre_clon', sourceKey: 'nombre_clon', as: 'Caracteristicas' });
            CaracteristicaSequelize.belongsTo(ClonSequilize, { foreignKey: 'nombre_clon', targetKey: 'nombre_clon', as: 'Clones' });
        } catch (error) {
            throw new BadRequestError('Error al inicializar el modelo de caracteristica.');
        }
    }

}