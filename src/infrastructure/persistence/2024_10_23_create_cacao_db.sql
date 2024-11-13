
-- Base de datos para almacenar información sobre plantas de cacao y sus clones.

-- Eliminar la base de datos si ya existe
DROP DATABASE IF EXISTS cacao_db;

-- Crear la base de datos
CREATE DATABASE cacao_db;
USE cacao_db;

-- Tabla principal: CacaoPlanta
CREATE TABLE CacaoPlanta (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    especie VARCHAR(255) NOT NULL,
    variedad VARCHAR(255) NOT NULL UNIQUE
);

-- Tabla de clones: Clon
CREATE TABLE Clon (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    variedad VARCHAR(255) NOT NULL,
    nombre_clon VARCHAR(255) NOT NULL UNIQUE,
    origen VARCHAR(255) NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (variedad) REFERENCES CacaoPlanta(variedad) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla de características: Caracteristica
CREATE TABLE Caracteristica (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nombre_clon VARCHAR(255) NOT NULL,
    caracteristicas JSON NOT NULL,
    FOREIGN KEY (nombre_clon) REFERENCES Clon(nombre_clon) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla de dimensiones: 
CREATE TABLE Dimensiones (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nombre_clon VARCHAR(255) NOT NULL,
    altura_maxima DECIMAL(5,2) NOT NULL,
    diametro DECIMAL(5,2) NOT NULL,
    imagenes JSON NOT NULL,
    FOREIGN KEY (nombre_clon) REFERENCES Clon(nombre_clon) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla de condiciones ambientales: CondicionesAmbiente
CREATE TABLE CondicionesClimaticas (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nombre_clon VARCHAR(255) NOT NULL,
    rango_altitudinal VARCHAR(255) NOT NULL,  -- Altitud
    rango_luminosidad VARCHAR(255) NOT NULL,   -- Luminosidad
    temperatura VARCHAR(255) NOT NULL,          -- Temperatura
    precipitacion VARCHAR(255) NOT NULL,        -- Precipitación
    humedad_relativa VARCHAR(255) NOT NULL,     -- Humedad relativa
    FOREIGN KEY (nombre_clon) REFERENCES Clon(nombre_clon) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla de mantenimiento: Mantenimiento
CREATE TABLE Mantenimiento (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nombre_clon VARCHAR(255) NOT NULL,
    tipo_abonos JSON NOT NULL,
    frecuencia_podas VARCHAR(255),
    FOREIGN KEY (nombre_clon) REFERENCES Clon(nombre_clon) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla de plagas y enfermedades: PlagasEnfermedades
CREATE TABLE PlagasEnfermedades (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nombre_clon VARCHAR(255) NOT NULL,
    asociaciones_plagas_enfermedades JSON NOT NULL,
    FOREIGN KEY (nombre_clon) REFERENCES Clon(nombre_clon) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla de usos: Usos
CREATE TABLE Usos (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nombre_clon VARCHAR(255) NOT NULL,
    usos JSON NOT NULL,
    expansion_geografica JSON NOT NULL,
    FOREIGN KEY (nombre_clon) REFERENCES Clon(nombre_clon) ON DELETE CASCADE ON UPDATE CASCADE
);
