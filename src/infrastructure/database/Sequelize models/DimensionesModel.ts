import { Model, DataTypes } from "sequelize";
import { BadRequestError } from "../../errors/CustomErrors";
import { ClonSequilize } from "./ClonModel";


export class DimensionesSequelize extends Model {

    static async initModel(sequelize: any) {
        try {
            DimensionesSequelize.init(
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
                    altura_maxima: {
                      type: DataTypes.DECIMAL(5, 2),
                      allowNull: false,
                    },
                    diametro: {
                      type: DataTypes.DECIMAL(5, 2),
                      allowNull: false,
                    },
                    imagenes: {
                      type: DataTypes.JSONB,
                      allowNull: false,
                    },
                  },
                  {
                    sequelize,
                    modelName: 'Dimensiones',
                    tableName: 'Dimensiones',
                    timestamps: false // Desactivar los campos createdAt y updatedAt
                  }
            )

            ClonSequilize.hasOne(DimensionesSequelize, { foreignKey: 'nombre_clon', sourceKey: 'nombre_clon', as: 'Dimensiones' });
            DimensionesSequelize.belongsTo(ClonSequilize, { foreignKey: 'nombre_clon', targetKey: 'nombre_clon', as: 'Clones' });
            
        } catch (error) {
            throw new BadRequestError('Error al inicializar el modelo de dimensiones.');
        }
    }

}