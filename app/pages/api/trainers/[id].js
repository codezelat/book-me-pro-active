// pages/api/trainers/[id].js
import connectToDatabase from '../../../../Lib/mongodb';
import PersonalTrainer from '../../../../server/models/Trainer';

export default async function handler(req, res) {
    await connectToDatabase();

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const trainer = await PersonalTrainer.findById(id).populate('availability');
            if (!trainer) {
                return res.status(404).json({ error: 'Trainer not found' });
            }
            res.status(200).json(trainer);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
