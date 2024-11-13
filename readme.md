# 📄 **Documentación de CacaoAPI**

---

## **Descripción**

**CacaoAPI** es una API RESTful diseñada para gestionar información relacionada con el cultivo de cacao, con un enfoque particular en el cacao colombiano. Esta API permite a los usuarios acceder a datos sobre las plantas y clones de cacao, siendo útil tanto para **agricultores** y **entusiastas del cacao**, quienes necesitan información práctica sobre el cultivo y cuidado de las plantas, como para **desarrolladores** que desean integrar estos datos en sus aplicaciones.

La API gestiona internamente los datos mediante **operaciones CRUD** sobre las plantas y clones de cacao, lo que facilita el desarrollo y mantenimiento de la aplicación. Sin embargo, estas operaciones no están expuestas para que otros desarrolladores manipulen los datos directamente. La API proporciona principalmente **endpoints de lectura (GET)** para que los usuarios puedan acceder a la información sin modificarla.

CacaoAPI está construida con **Node.js** y **TypeScript**, siguiendo principios de **Diseño Orientado a Dominios (DDD)** para estructurar el código de manera flexible y fácil de mantener. Además, utiliza **MySQL** como sistema de base de datos para la persistencia de los datos y **Google Cloud Storage** para el almacenamiento de imágenes y otros datos relacionados con las plantas y clones de cacao.

Esta API centraliza la información sobre el cacao colombiano y facilita el acceso a estos datos para apoyar el desarrollo del sector agrícola y la investigación sobre el cultivo del cacao.

---

## 🛠 **Versiones**

- **Versión**: 1.0.0
    
- **Descripción**: CacaoAPI permite gestionar datos de plantas y clones de cacao. Incluye integración con Google Cloud para almacenar imágenes y una base de datos MySQL para la persistencia de los datos.
    

---

## 🔑 **Funcionalidades Principales**

1. **Gestión de Plantas de Cacao**  
    CRUD (Crear, Leer, Actualizar, Eliminar) de información sobre las plantas de cacao.
    
2. **Gestión de Clones de Cacao**  
    CRUD de datos relacionados con los clones de cacao.
    
3. **Almacenamiento en la Nube**  
    Integración con Google Cloud Storage para guardar imágenes relacionadas con las plantas y clones de cacao.
    
4. **Accesibilidad y Open Source**  
    Los endpoints de tipo **GET** están abiertos para permitir la integración de la API con otras aplicaciones.
    

---

## 🛡 **Autorización**

La API está configurada para permitir solicitudes **CORS** (Cross-Origin Resource Sharing) con diferentes niveles de acceso según el tipo de método HTTP utilizado. A continuación, se detallan las políticas de autenticación y CORS para las solicitudes a la API.

### **Política de CORS**

La API está configurada para permitir solicitudes CORS (orígenes cruzados) de acuerdo con las siguientes reglas:

- **Métodos** **`GET`****:**  
    Las solicitudes con el método `GET` están permitidas desde **cualquier origen**, lo que significa que cualquiera puede realizar consultas a estos endpoints sin restricciones de dominio, incluyendo herramientas como Postman o cURL.
    
- **Métodos** **`POST`****,** **`PUT`****,** **`DELETE`****, etc.:**  
    Para operaciones de modificación de datos (POST, PUT, DELETE, etc.), las solicitudes están limitadas a **orígenes específicos**, que se definen en el arreglo `ALLOWED_ORIGINS`. Estos orígenes son:
    
    - [https://frontend-users-ho6g9prlm-arturo-acostas-projects.vercel.app](https://frontend-users-ho6g9prlm-arturo-acostas-projects.vercel.app)
        
        Cualquier intento de acceder a estas rutas desde un dominio no permitido recibirá un error relacionado con CORS.
        

---

## 🚫 **Respuestas de Error de Autenticación Fallida**

Si el token de autenticación no se incluye en el encabezado de la solicitud al intentar realizar una operación **CRUD**, o si es inválido, el servidor responderá con:

- **401** (No autorizado)
    
- **400** (Solicitud incorrecta)
    

---

## 🖥 **Tecnologías Utilizadas**

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
    
- **TypeScript**: Lenguaje de programación basado en JavaScript que agrega tipado estático.
    
- **MySQL**: Base de datos relacional utilizada para el almacenamiento de la información.
    
- **Sequelize**: ORM para gestionar las interacciones con la base de datos MySQL.
    
- **Google Cloud Storage**: Almacenamiento en la nube para guardar las imágenes de las plantas y clones de cacao.
    
- **Express**: Framework web de Node.js para crear y gestionar rutas HTTP.
    
- **Zod**: Librería de validación de datos para garantizar la integridad de las solicitudes.
    
- **DDD (Diseño Orientado a Dominios)**: Principio de diseño de software para crear una arquitectura más flexible y escalable.
    

---

## ⚠ **Manejo de Errores**

La API maneja los errores de manera estructurada para proporcionar mensajes claros sobre los problemas encontrados:

- **400 Bad Request**: Solicitudes con datos inválidos o incompletos.
    
- **404 Not Found**: Recurso no encontrado en la base de datos.
    
- **409 Conflict**: Intento de insertar un registro duplicado.
    
- **500 Internal Server Error**: Errores inesperados del servidor.
    
- **503 Service Unavailable**: Problemas al conectar con la base de datos.
    

Los errores específicos se manejan mediante las siguientes clases personalizadas:

- `BadRequestError`
    
- `ServerError`
    
- `NotFoundError`
    
- `DatabaseError`
    
- `DuplicateEntryError`
    
- `DatabaseGenericError`
    

---

## Documentación de la API

La documentación completa de la API está disponible en Postman. Haz clic en el siguiente enlace para verla:

[Documentación de CacaoAPI en Postman](https://documenter.getpostman.com/view/39180342/2sAY547zFf)


---

## 📜 **Licencia**

La API de Cacao está licenciada bajo la **Licencia ISC**.
