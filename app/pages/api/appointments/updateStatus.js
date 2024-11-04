// pages/api/appointments/updateStatus.js
import connectToDatabase from '../../../../Lib/mongodb';
import Appointment from '../../../../server/models/Appointments';

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'PUT') {
        const { id, status } = req.body;
        try {
            await Appointment.findByIdAndUpdate(id, { status });
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update appointment status' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
