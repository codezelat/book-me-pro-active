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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Divider, Grid, CardContent, Card, FormControlLabel, Checkbox } from '@mui/material';
import { useSession } from "next-auth/react";
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));


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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);

    if (selectedDate < today) {
      alert("You cannot add a date in the past. Please select today or a future date.");
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
       <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          color: 'primary.main',
          textAlign: 'center',
          marginBottom: 4 
        }}
      >
        Coach Calendar Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" gutterBottom>
                Date & Slot Configuration
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          fullWidth 
                          variant="outlined" 
                          margin="normal" 
                        />
                      )}
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Number of Slots"
                    type="number"
                    value={slots}
                    onChange={(e) => setSlots(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </StyledCardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" gutterBottom>
                Time Slot Configuration
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Start Time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    // inputProps={{
                    //   step: 300, // 5 min
                    // }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="End Time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    // inputProps={{
                    //   step: 300, // 5 min
                    // }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={addTimeSlot}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Add Time Slot
                  </Button>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" color="textSecondary">
                    Current Time Slots: {timeSlots.length > 0 ? timeSlots.join(', ') : 'None'}
                  </Typography>
                </Grid>
              </Grid>
            </StyledCardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard>
            <StyledCardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={multipleBookingsAllowed}
                        onChange={(e) => setMultipleBookingsAllowed(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Allow Multiple Bookings"
                  />
                </Grid>
                {/* <Grid item xs>
                  <Typography variant="body2" color="textSecondary">
                    Current Time Slots: {timeSlots.length > 0 ? timeSlots.join(', ') : 'None'}
                  </Typography>
                </Grid> */}
              </Grid>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={addAvailableDate}>
        Add Available Date
      </Button>
     
      <Divider sx={{ my: 3 }} />
 

      <Box sx={{ width: '100%', mb: 2 }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          marginTop: 3, 
          marginBottom: 2, 
          fontWeight: 600, 
          color: 'text.primary' 
        }}
      >
        Available Dates
      </Typography>

      <TableContainer 
        component={Paper} 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden' 
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: 'grey.100' }}>
            <TableRow>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'text.secondary' 
                }}
              >
                Date
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'text.secondary' 
                }}
              >
                Time Slots
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'text.secondary' 
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availableDates.map((availableDate) => (
              <TableRow 
                key={availableDate._id} 
                hover
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 } 
                }}
              >
                <TableCell>
                  {new Date(availableDate.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1 
                  }}>
                    {Array.isArray(availableDate.timeSlots) && availableDate.timeSlots.length > 0 ? (
                      availableDate.timeSlots.map((timeSlot, index) => (
                        <Box 
                          key={index} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            p: 1, 
                            bgcolor: 'grey.100', 
                            borderRadius: 1 
                          }}
                        >
                          <Typography variant="body2">
                            {timeSlot}
                          </Typography>
                          <Button 
                            variant="outlined" 
                            color="error" 
                            size="small"
                            onClick={() => removeTimeSlot(availableDate._id, index)}
                          >
                            Remove
                          </Button>
                        </Box>
                      ))
                    ) : (
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                      >
                        No time slots available
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
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
    </Box>
    </Container>
  );
};

export default AdminCalendar;