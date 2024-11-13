// Función para ejecutar la migración de las bases de datos.

import { createConnection } from 'mysql2/promise';
import {readFile}  from 'fs/promises';
import { dbConfig } from '../database/dbConfig';

async function runMigration() {
  const connection = await createConnection(dbConfig);

  // Leer el archivo de migración
  const migrationSQL = await readFile('./src/infrastructure/persistence/2024_10_23_create_cacao_db.sql', 'utf8');
  
  // Separar las instrucciones SQL
  const sqlStatements = migrationSQL.split(';').map(stmt => stmt.trim()).filter(stmt => stmt.length > 0);

  // Ejecutar cada instrucción SQL por separado
  for (const statement of sqlStatements) {
    await connection.query(statement);
  }
  
  console.log('Migración completada.');
  
  await connection.end();
}

async function runSeed() {
  const connection = await createConnection(dbConfig);
  
  // Leer el archivo de semillas
  const seedSQL = await readFile('./src/infrastructure/persistence/cacao_seeds.sql', 'utf8');
  
  // Separar las instrucciones SQL
  const sqlStatements = seedSQL.split(';').map(stmt => stmt.trim()).filter(stmt => stmt.length > 0);

  // Ejecutar cada instrucción SQL por separado
  for (const statement of sqlStatements) {
    await connection.query(statement);
  }
  
  console.log('Datos iniciales sembrados.');
  
  await connection.end();
}

(async () => {
  try {
    await runMigration(); // Ejecutar la migración
    await runSeed();     // Sembrar los datos
  } catch (error) {
    console.error('Error al ejecutar migraciones o sembrar datos:', error);
  }
})();