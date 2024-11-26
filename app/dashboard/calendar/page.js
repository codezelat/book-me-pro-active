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
  const [multipleBookingsAllowed, setMultipleBookingsAllowed] = useState(false);
  

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get('/api/available_dates?coachId=' + session?.user?.id);
        
        // Get today's date and set the time to midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        // Filter and sort dates starting from today
        const filteredAndSortedDates = response.data
          .filter(date => new Date(date.date) >= today) // Filter for dates from today onwards
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending

        setAvailableDates(filteredAndSortedDates);
      } catch (error) {
        console.error("Error fetching available dates:", error);
      }
    };

    if (session?.user?.id) {
      fetchAvailableDates();
    }
  }, [session]);

  const addTimeSlot = () => {
    if (startTime && endTime) {
      // Convert start and end times to Date objects for comparison
      const newStartTime = new Date(`1970-01-01T${startTime}:00`);
      const newEndTime = new Date(`1970-01-01T${endTime}:00`);
  
      // Check for overlapping time slots if the date already exists
      const existingDate = availableDates.find(
        (availableDate) => new Date(availableDate.date).toISOString().split("T")[0] === new Date(date).toISOString().split("T")[0]
      );
  
      if (existingDate) {
        const isOverlapping = existingDate.timeSlots.some((timeSlot) => {
          const [existingStart, existingEnd] = timeSlot.split(' - ').map(time => new Date(`1970-01-01T${time}:00`));
          // Check if the new time slot overlaps with any existing time slot
          return (newStartTime < existingEnd && newEndTime > existingStart);
        });
  
        if (isOverlapping) {
          alert("The new time slot overlaps with an existing time slot. Please choose a different time.");
          return;
        }
      }
  
      // If no overlap, add the time slot
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
  
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Ensure date is in a comparable format
  
    // Check if the date already exists
    const existingDate = availableDates.find(
      (availableDate) => new Date(availableDate.date).toISOString().split("T")[0] === formattedDate
    );
  
    if (existingDate) {
      // If date exists, append the new time slots to the existing timeSlots array
      try {
        const updatedTimeSlots = [...existingDate.timeSlots, ...timeSlots];
        await axios.put(`/api/available_dates?id=${existingDate._id}`, { timeSlots: updatedTimeSlots });
        
        // Update the local state
        setAvailableDates(availableDates.map((d) =>
          d._id === existingDate._id
            ? { ...d, timeSlots: updatedTimeSlots }
            : d
        ));
        setDate(null);
        setSlots('');
        setTimeSlots([]);
        alert("Time slots added successfully to the existing date.");
      } catch (error) {
        console.error("Error appending time slots:", error);
        alert("Failed to append time slots.");
      }
    } else {
      // If date doesn't exist, create a new record
      try {
        await axios.post('/api/available_dates', { date, slots, timeSlots, coachId });
        setAvailableDates([...availableDates, { date, slots, timeSlots, coachId }]);
        setDate(null);
        setSlots('');
        setTimeSlots([]);
        alert("Available date added successfully.");
      } catch (error) {
        console.error("Error adding available date:", error);
        alert("Failed to add available date.");
      }
    }
  };

  const removeAvailableDate = async (id) => {
    try {
      // Make an API call to delete the available date
      await axios.delete(`/api/available_dates?id=${id}`);
  
      // Update the local state to remove the deleted date
      setAvailableDates(availableDates.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error removing available date:", error);
      alert("Failed to remove available date.");
    }
  };

  const removeTimeSlot = async (availableDateId, index) => {
    // Find the available date to update its time slots
    const availableDate = availableDates.find(date => date._id === availableDateId);
    if (!availableDate) return;

    const updatedTimeSlots = availableDate.timeSlots.filter((_, i) => i !== index); // Remove the time slot at the given index

    // Update the local state
    setAvailableDates(availableDates.map(date => 
      date._id === availableDateId ? { ...date, timeSlots: updatedTimeSlots } : date
    ));

    // Send the updated time slots to the backend
    try {
      await axios.put(`/api/available_dates?id=${availableDateId}`, { timeSlots: updatedTimeSlots });
    } catch (error) {
      console.error("Error updating time slots:", error);
      alert("Failed to update time slots.");
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
                            onClick={() => removeTimeSlot(availableDate._id, index)} 
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