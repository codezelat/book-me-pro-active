// pages/api/appointments/[id].js
import dbConnect from '../../../utils/dbConnect';
import Appointment from '../../../models/Appointment';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'PATCH') {
    const { status } = req.body;
    if (!['approved', 'declined', 'not reviewed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    try {
      const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
      if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

      res.status(200).json({ success: true, data: appointment });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
