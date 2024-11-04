// pages/api/appointments/[status].js
import connectToDatabase from '../../../../Lib/mongodb';
import Appointment from '../../../../server/models/Appointments';

export default async function handler(req, res) {
    await connectToDatabase();

    const { status } = req.query;

    if (req.method === 'GET') {
        try {
            const appointments = await Appointment.find({ status });
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch appointments' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
