import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { CircleX, CircleCheck, CircleChevronDown } from "lucide-react";

export default function CustomizedDataGrid() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();

        // Assuming the data structure is known and consistent
        // Set columns based on your data structure
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
            renderCell: (params) => renderStatus(params.value), // Custom render for status
          },
          {
            field: "contact",
            headerName: "Contact",
            headerAlign: "center",
            flex: 0.5,
            minWidth: 200,
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
                justifyContent: "center", // Center align horizontally
                width: "100%", // Take full width of the cell
                height: "100%", // Take full height of the cell to vertically center items
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
                onClick={() => alert("Declined")}
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
                onClick={() => alert("Accepted")}
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
          id: index + 1, // Assign a unique ID
          name: appointment.name,
          email: appointment.email,
          phone: appointment.phone,
          date: new Date(appointment.selectedDate).toLocaleDateString(),
          time: new Date(appointment.selectedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: appointment.status || "Pending",
        }));

        setRows(formattedRows);
        setColumns(columns);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Function to render status
  function renderStatus(status) {
    const colors = {
      Approved: "success",
      Declined: "default",
      Pending: "default",
    };

    return <Chip label={status} color={colors[status]} size="small" />;
  }

  // Placeholder functions for Edit and Delete actions
  const handleEdit = (row) => {
    console.log("Edit row:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete row:", row);
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