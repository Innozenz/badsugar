import Work from "../../../models/Work";
import db from "../../../utils/db";
import {v2 as cloudinary} from "cloudinary";
import upload from "../../../multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {

        try {
            const result = await new Promise((resolve, reject) => {
                upload.single('image')(req, res, (err) => {
                    if (err) return reject(err);
                    return resolve(req.file);
                });
            });

            console.log(result);

            const imagePath = `/uploads/`;
            const image = result ? imagePath + result.filename : '';
            const { title, description } = req.body;
            console.log(req.body)
            await db.connect();
            const work = new Work({ title, description, image });
            await work.save();

            res.status(200).json({ message: 'Travail ajouté avec succès.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'ajout du travail.' });
        }
    } else {
        res.status(400).json({ message: 'Méthode non autorisée.' });
    }
}
