import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Button, Box, CircularProgress, Typography } from "@mui/material";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { CircleX, CircleCheck } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function CustomizedDataGrid() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch appointments based on status
  const fetchAppointments = async (status) => {
    if (!session?.user?.id) {
      console.error("User session is not available");
      return;
    }

    try {
      setLoading(true);
      setSelectedStatus(status);
      const response = await axios.get(
        `/api/appointments?coachId=${session.user.id}&status=${status}`
      );
      setAppointments(response.data);
      console.log(`Fetched appointments for status '${status}':`, response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Define Data Grid columns
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
      renderCell: (params) => (
        <Typography variant="body1" fontWeight="500">
          {params.row.name}
        </Typography>
      ),
    },
    {
      field: "selectedDate",
      headerName: "Date",
      flex: 1,
      renderCell: (params) =>
        new Date(params.row.selectedDate).toLocaleDateString(),
    },
    {
      field: "selectedTime",
      headerName: "Time",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <FaPhoneAlt size={18} color="#037D40" />
          <Typography>{params.row.phone}</Typography>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <FaEnvelope size={18} color="#037D40" />
          <Typography>{params.row.email}</Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleStatusUpdate(params.row._id, "Declined")}
            startIcon={<CircleX />}
          >
            Decline
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleStatusUpdate(params.row._id, "Approved")}
            startIcon={<CircleCheck />}
          >
            Approve
          </Button>
        </Box>
      ),
    },
  ];

  const styles = {
    customRowSpacing: {
      "& .MuiDataGrid-row": {
        marginBottom: "10px", // Adjust spacing between rows
      },
    },
  };

  // Handle status change actions
  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      // Send a PATCH request to update the appointment status
      const response = await axios.patch(`/api/appointments`, {
        id: appointmentId,
        status: status,
      });

      if (response.status === 200) {
        alert(`Appointment status updated to ${status}`);
        // Refresh the appointment list after updating the status
        fetchAppointments(selectedStatus);
      } else {
        alert("Error updating status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    }
  };

  // Initial fetch for "pending" appointments
  useEffect(() => {
    fetchAppointments("pending");
  }, []);

  return (
    <Box sx={{ width: "100%", paddingTop: 10, paddingLeft: 20 }}>
      {/* Header and Status Buttons */}
      <Box display="flex" justifyContent="space-between" pb={2}>
        <Typography variant="h6" fontWeight="bold">
          My Bookings
        </Typography>
        <Box display="flex" gap={2}>
          {["pending", "Approved", "Declined"].map((status) => (
            <Button
              key={status}
              onClick={() => fetchAppointments(status)}
              sx={{
                bgcolor: selectedStatus === status ? "#037D40" : "#E6F2EC",
                color: selectedStatus === status ? "white" : "#037D40",
                px: 3,
                fontWeight: "bold",
                "&:hover": { bgcolor: "#037D40", color: "white" },
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Loading Spinner */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {/* No Data Message */}
      {!loading && appointments.length === 0 && selectedStatus && (
        <Typography textAlign="center" mt={3} color="textSecondary">
          No {selectedStatus.toLowerCase()} appointments found.
        </Typography>
      )}

      {/* Data Grid */}
      {!loading && appointments.length > 0 && (
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={appointments}
            columns={columns}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            autoHeight
            sx={styles.customRowSpacing}
          />
        </Box>
      )}
    </Box>
  );
}
