import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  Container,
} from "@mui/material";

const Form = ({ selectedDate, selectedTime, closeModal, isIndividualSession,  coachId }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    appointmentDetails: "",
  });

  // Log the selected date and time to verify they're passed correctly
  console.log("Form selected date:", selectedDate);
  console.log("Form selected time:", selectedTime);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", { ...formData, selectedDate, selectedTime,  isIndividualSession, coachId });

    try {
      const response = await axios.post("/api/appointments", {
        ...formData,
        selectedDate,
        selectedTime,
        isIndividualSession,
        coachId, // Include the coach ID in the request body
      });

      if (response.status === 201) {
        alert("Appointment created successfully!");
        closeModal();
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Fill in your details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Container sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              name="name"
              required
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              name="phone"
              required
              variant="outlined"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              required
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Appointment Details"
              name="appointmentDetails"
              multiline
              rows={4}
              variant="outlined"
              value={formData.appointmentDetails}
              onChange={handleChange}
            />

            {/* Hidden input for coachId */}
            <input type="hidden" name="coachId" value={coachId} />


            <Button
              type="submit"
              variant="contained"
              className="text-white bg-green-500 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Container>
        </form>
      </Box>
    </Modal>
  );
};

export default Form;