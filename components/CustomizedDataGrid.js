// components/CustomizedDataGrid.js

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { CircleX, CircleCheck } from "lucide-react";
import axios from "axios"; // Use axios for API calls
import { useSession } from "next-auth/react"; 

export default function CustomizedDataGrid() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!session || !session.user || !session.user.id) return; // Ensure session and user data are available
      try {
        const response = await axios.get(`/api/appointments?coachId=${session.user.id}`); // Replace with your API endpoint
        const data = response.data;

        // Define columns
        const columns = [
          { field: "name", headerName: "Name", flex: 1.5, minWidth: 200 },
          { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
          { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
          { field: "date", headerName: "Date", flex: 1, minWidth: 100 },
          { field: "time", headerName: "Time", flex: 1, minWidth: 100 },
          {
            field: "status",
            headerName: "Status",
            flex: 0.5,
            minWidth: 90,
            renderCell: (params) => renderStatus(params.value),
          },
          {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            flex: 0.5,
            minWidth: 200,
            renderCell: (params) => (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Button
                  sx={{
                    bgcolor: "#D50000",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    "&:hover": { bgcolor: "#B20000" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                  }}
                  size="small"
                  onClick={() => handleAction(params.row, "Declined")}
                >
                  Decline
                  <CircleX sx={{ color: "white", fill: "white" }} />
                </Button>
                <Button
                  sx={{
                    bgcolor: "#037D40",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    "&:hover": { bgcolor: "#025b2e" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                  }}
                  size="small"
                  onClick={() => handleAction(params.row, "Approved")}
                >
                  Approve
                  <CircleCheck sx={{ color: "white", fill: "white" }} />
                </Button>
              </div>
            ),
          },
        ];

        // Map data to the format expected by DataGrid
        const formattedRows = data.map((appointment, index) => ({
          id: appointment._id, // Use unique MongoDB ID as the row ID
          name: appointment.name,
          email: appointment.email,
          phone: appointment.phone,
          date: new Date(appointment.selectedDate).toLocaleDateString(),
          time: appointment.selectedTime,
          status: appointment.status || "Pending",
        }));

        setRows(formattedRows);
        setColumns(columns);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [session]);

  // Function to render status
  function renderStatus(status) {
    const colors = {
      Approved: "success",
      Declined: "default",
      Pending: "default",
    };

    return <Chip label={status} color={colors[status]} size="small" />;
  }

  // Function to handle Approve/Decline actions
  const handleAction = async (row, newStatus) => {
    try {
      const response = await axios.patch("/api/appointments", {
        id: row.id,
        status: newStatus,
      });

      if (response.status === 200) {
        // Remove the updated row from the DataGrid
        setRows((prevRows) => prevRows.filter((r) => r.id !== row.id));
        console.log(`Appointment ${newStatus.toLowerCase()} successfully.`);
      } else {
        console.error(`Failed to ${newStatus.toLowerCase()} appointment.`);
      }
    } catch (error) {
      console.error(`Error during ${newStatus.toLowerCase()} action:`, error);
    }
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        autoHeight
        checkboxSelection
        rows={rows}
        columns={columns}
        rowHeight={70}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
      />
    </div>
  );
}
