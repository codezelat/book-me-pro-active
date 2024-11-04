// pages/api/appointments/create.js
import connectToDatabase from '../../../../Lib/mongodb';
import PersonalTrainer from '../../../../server/models/Appointments';

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'POST') {
        const { bookedAt, clientEmail, clientPhoneNo, clientName, clientNotes, trainerId, status } = req.body;

        try {
            const appointment = new Appointments({
                bookedAt,
                clientEmail,
                clientPhoneNo,
                clientName,
                clientNotes,
                trainerId,
                status: status || 'pending'
            });
            await appointment.save();
            res.status(201).json(appointment);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create appointment' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
