//Middleware para subir y procesar imágenes

import { Storage } from '@google-cloud/storage';
import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

// Configurar Google Cloud Storage
const gcs = new Storage({
    credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS!),
});
const bucketName = 'cacao-api';

const multerStorage = multer.memoryStorage(); // Para almacenar la imagen en memoria
const upload = multer({ storage: multerStorage }); // Configurar multer


// Middleware para manejar la carga de imágenes
const uploadAndProcessImages = async (req: Request | any , res: Response, next: NextFunction) => {
    // Usar multer para procesar la carga de archivos
    upload.single('imagen')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Error al subir la imagen' });
        }

        try {

            // nombre del archivo màs fecha

            const date = new Date();
            const filename = `${req.body.nombre_clon}-${date.getTime()}`; // Nombre único basado en el clon

            const jpgFilename = `${filename}.jpg`;
            const webpFilename = `${filename}.webp`;
            const tiffFilename = `${filename}.tiff`;

            // Verificar si se ha subido una imagen o si el archivo es de tipo jpg
            if (!req.file || req.file.mimetype !== 'image/jpeg') {
                return res.status(400).json({ error: 'No se ha seleccionado una imagen jpg' });
            }
                        
            // Subir la imagen JPG 
            const jpgFile = gcs.bucket(bucketName).file(jpgFilename);
            await jpgFile.save(req.file.buffer, {
                contentType: 'image/jpeg',
                resumable: false,
                metadata: {
                    cacheControl: 'no-cache',
                },
            })
            const jpg = `https://storage.googleapis.com/${bucketName}/${jpgFilename}`;

             // Crear y subir la imagen WebP
            const webpBuffer = await sharp(req.file.buffer).webp().toBuffer();
            const webpFile = gcs.bucket(bucketName).file(webpFilename);
            await webpFile.save(webpBuffer, { contentType: 'image/webp' });
            const webp = `https://storage.googleapis.com/${bucketName}/${webpFilename}`;

            // Crear y subir la imagen TIFF
            const tiffBuffer = await sharp(req.file.buffer).tiff().toBuffer();
            const tiffFile = gcs.bucket(bucketName).file(tiffFilename);
            await tiffFile.save(tiffBuffer, { contentType: 'image/tiff' });
            const tiff = `https://storage.googleapis.com/${bucketName}/${tiffFilename}`;

            // Guardar las URLs en el objeto de solicitud para usar en la siguiente middleware
            req.uploadedUrls = {
                jpg,
                webp,
                tiff,
            };

            req.body.urlName = filename;

            req.body.imagenes = req.uploadedUrls;

            next(); // Pasar al siguiente middleware o ruta        

        } catch (processingError: unknown) {
            return res.status(500).json({ message: 'Error al procesar la imagen.', error: processingError });
        }
    });
};

export default uploadAndProcessImages;



