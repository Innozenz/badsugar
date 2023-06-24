import Work from '../../../models/Work';
import db from "../../../utils/db";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await db.connect();
            const works = await Work.find({});
            res.status(200).json(works);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des travaux.' });
        }
    } else {
        res.status(400).json({ message: 'Méthode non autorisée.' });
    }
}
