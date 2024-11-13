// Modelo Sequelize de la tabla Clon

import { Model, Sequelize, DataTypes } from "sequelize";
import { BadRequestError } from "../../errors/CustomErrors";
import { CacaoPlanta } from "./PlantaModel";


export class ClonSequilize extends Model {

    // Se agrega una condición para que no se cree la asociación entre las tablas si no se necesita CacaoPlanta, ya que al no tener la tabla CacaoPlanta no se puede crear la asociación y se genera un error

    static async initModel(sequelize: Sequelize, condicion: boolean) {
        try {
            ClonSequilize.init(
                {
                    id: {
                        type: DataTypes.UUID,
                        primaryKey: true,
                        defaultValue: DataTypes.UUIDV4,
                    },
                    nombre_clon: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                    },
                    variedad: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    origen: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    }, 
                    descripcion: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                },
                {
                    sequelize, // Instancia de sequelize
                    modelName: 'Clon', // Nombre del modelo q
                    tableName: 'Clon',
                    timestamps: false // Desactivar los campos createdAt y updatedAt
                }
            );
            

            if(condicion) {
                CacaoPlanta.hasMany(ClonSequilize, { foreignKey: 'variedad', sourceKey: 'variedad', as: 'Clones' });
                ClonSequilize.belongsTo(CacaoPlanta, { foreignKey: 'variedad', targetKey: 'variedad' });
            }
    
        } catch (error) {
            throw new BadRequestError('Error al inicializar el modelo de clon.');
        }
    }
}