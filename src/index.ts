// Archivo principal de la aplicación que se encarga de levantar el servidor y conectar las rutas con el servidor

import express from 'express';
import dotenv from "dotenv";
import { createPlantasConnection } from './infrastructure/routes/rutasPlantas';
import { createClonesConnection } from './infrastructure/routes/rutasClones';
import { createCaracteristicasClonesConnection } from './infrastructure/routes/rutasCaracteristicasClones';
import { createCondicionesClimaticasConnection } from './infrastructure/routes/rutasCondicionesClimaticas';
import { createMantenimientoConnection } from './infrastructure/routes/rutasMantenimiento';
import { createPlagasEnfermedadesConnection } from './infrastructure/routes/rutasPlagasEnfermedades';
import { createUsosConnection } from './infrastructure/routes/rutasUsos';
import { createDimensionesConnection } from './infrastructure/routes/rutasDimensiones';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); // Middleware para parsear el body de las peticiones
app.disable('x-powered-by'); // Deshabilita la cabecera X-Powered-By
app.use("/api", createPlantasConnection()); // Conexión a las rutas de plantas
app.use("/api", createClonesConnection()); // Conexión a las rutas de clones
app.use("/api", createCaracteristicasClonesConnection()); // Conexión a las rutas de caracteristicas de clones
app.use("/api", createCondicionesClimaticasConnection()); // Conexión a las rutas de condiciones climáticas
app.use("/api", createMantenimientoConnection()); // Conexión a las rutas de mantenimiento
app.use("/api", createPlagasEnfermedadesConnection()); // Conexión a las rutas de plagas y enfermedades
app.use("/api", createUsosConnection()); // Conexión a las rutas de usos
app.use("/api", createDimensionesConnection()) // Conexión a las rutas de dimensiones


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app; // Exporta la aplicación para poder ser utilizada en los tests
