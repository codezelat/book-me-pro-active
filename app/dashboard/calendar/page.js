"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSession } from "next-auth/react";

const AdminCalendar = () => {
  const { data: session } = useSession(); // Get session data
  const [availableDates, setAvailableDates] = useState([]);
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  

  useEffect(() => {
    // const fetchAvailableDates = async () => {
    //   const response = await axios.get('/api/available-dates');
    //   setAvailableDates(response.data);
    // };

    // fetchAvailableDates();
  }, []);

  const addTimeSlot = () => {
    if (startTime && endTime) {
      setTimeSlots([...timeSlots, `${startTime} - ${endTime}`]);
      setStartTime('');
      setEndTime('');
    } else {
      alert("Please enter both start and end times.");
    }
  };


  const addAvailableDate = async () => {
    if (!date || !slots || timeSlots.length === 0) {
      alert("Please select a date and enter the number of slots.");
      return;
    }

    const coachId = session?.user?.id; // Get coachId from session

    if (!coachId) {
      alert("Coach ID is not available.");
      return;
    }

    try {
      // Send coachId along with date, slots, and timeSlots
      await axios.post('/api/available_dates', { date, slots, timeSlots, coachId });
      setAvailableDates([...availableDates, { date, slots, timeSlots, coachId }]);
      setDate(null);
      setSlots('');
      setTimeSlots([]);
    } catch (error) {
      console.error("Error adding available date:", error);
      alert("Failed to add available date.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Coach Calendar
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={date}
        onChange={(newValue) => setDate(newValue)}
        // Use the 'textField' prop instead of 'renderInput'
        textField={(params) => <TextField {...params} fullWidth />} 
      />
      </LocalizationProvider>
      <TextField
        label="Number of Slots"
        type="number"
        value={slots}
        onChange={(e) => setSlots(e.target.value)}
        fullWidth
        margin="normal"
      />

<Typography variant="h6" gutterBottom>
        Add Time Slots
      </Typography>
      <TextField
        label="Start Time"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="End Time"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="secondary" onClick={addTimeSlot}>
        Add Time Slot
      </Button>

      <Typography variant="body1" style={{ marginTop: '10px' }}>
        Current Time Slots: {timeSlots.length > 0 ? timeSlots.join(', ') : 'None'}
      </Typography>

      <Button variant="contained" color="primary" onClick={addAvailableDate}>
        Add Available Date
      </Button>

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Available Dates
      </Typography>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time Slots</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availableDates.map((availableDate) => (
              <TableRow key={availableDate._id}>
                <TableCell>{new Date(availableDate.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <ul>
                    {Array.isArray(availableDate.timeSlots) && availableDate.timeSlots.length > 0 ? (
                      availableDate.timeSlots.map((timeSlot, index) => (
                        <li key={index}>
                          {timeSlot}
                          <Button 
                            variant="outlined" 
                            color="error" 
                            onClick={() => removeTimeSlot(index)} 
                            style={{ marginLeft: '10px' }}
                          >
                            Remove
                          </Button>
                        </li>
                      ))
                    ) : (
                      <li>No time slots available</li>
                    )}
                  </ul>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => removeAvailableDate(availableDate._id)}
                  >
                    Remove Date
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminCalendar;