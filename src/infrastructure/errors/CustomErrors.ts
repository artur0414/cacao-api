// Archivo de Error personalizado para manejar los errores de la aplicación


// Error para una bad request (400)
export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError';
    }
}

// Error genérico del servidor (500)

export class ServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ServerError';
    }
}

// Error de recurso no encontrado (404)

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

// Error cuando la conexión a la base de datos falla (503)

export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
    }
}

// Error para entradas duplicadas en la base de datos (409)

export class DuplicateEntryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DuplicateEntryError';
    }
}

// Error generico para base de datos (400)

export class DatabaseGenericError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseGenericError';
    }
}


// Clase para manejar los errores de la base de datos y retornar el error correspondiente según el error obtenido por código

export class DatabaseErrorHandler {
    constructor(private error: unknown, private message: string, private valor: string) {}
    
    // Método para manejar los errores de la base de datos

    procesarError(): Error {
        
        if (!this.isDatabaseError(this.error)) {
            return new DatabaseGenericError(this.message);
        } 

        switch (this.error.code || (this.error as any).parent?.code) {
            case 'ER_NO_REFERENCED_ROW_2':
                return new DatabaseError(`El valor de ${this.valor} no existe en la base de datos. Por favor, verifique los datos ingresados.`);
            case 'ER_DUP_ENTRY':
                return new DuplicateEntryError(`Ya existe un registro con el valor de ${this.valor} proporcionado.`);
            case 'ER_PARSE_ERROR':
                return new DatabaseError("Error al parsear el JSON de la base de datos");
            case 'ECONNREFUSED':
                return new DatabaseError("Error al conectar con la base de datos");
            case 'ER_ACCESS_DENIED_ERROR':
                return new DatabaseError("Error de acceso a la base de datos, por favor contacte al administrador del sistema para verificar las credenciales de acceso.");
            case 'ER_BAD_DB_ERROR':
                return new DatabaseError("Error al seleccionar la base de datos");
            case 'ETIMEDOUT':
                case 'SequelizeConnectionTimedOutError':
                    return new DatabaseError("Error de tiempo de espera al conectar con la base de datos");            
            case 'SequelizeConnectionError':
                return new DatabaseError("Error al conectar con la base de datos");
            case 'ER_NO_DB_ERROR': 
                return new DatabaseError("Error al seleccionar la base de datos");
            case 'PROTOCOL_CONNECTION_LOST':
                return new DatabaseError("Error de conexión con la base de datos");
            default:
            return new DatabaseGenericError(this.message);
                
        }
    
    }

    private isDatabaseError(error: unknown): error is {code:string} {
        return typeof error === 'object' && error !== null && ('code' in error || (error as any).parent?.code)
    }
}