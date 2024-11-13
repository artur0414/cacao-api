// Servicio de eliminación de imágenes en el almacenamiento en la nube de Google Cloud Storage

import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';
import { BadRequestError } from '../../infrastructure/errors/CustomErrors';

dotenv.config()

const gcs = new Storage({
    credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS!),
})

const bucketName = 'cacao-api';

export class ImageManager {
        
       async eliminarImagenes (name: string) {
        try {

            const jpgFilename = `${name}.jpg`;
            const webpFilename = `${name}.webp`;
            const tiffFilename = `${name}.tiff`;

            const eliminarImagenJPG = gcs.bucket(bucketName).file(jpgFilename).delete();
            const eliminarImagenWebP = gcs.bucket(bucketName).file(webpFilename).delete();
            const eliminarImagenTiff = gcs.bucket(bucketName).file(tiffFilename).delete();
            
            await Promise.all([eliminarImagenJPG, eliminarImagenWebP, eliminarImagenTiff]);

            return true
            
        } catch (error) {
            throw new BadRequestError('Error al eliminar las imágenes en el almacenamiento en la nube, por favor contacte con el administrador');
        }
    }
}