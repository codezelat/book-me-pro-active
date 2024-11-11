import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Button } from "@mui/material"; // Import Material-UI buttons
import {
  Phone,
  Mail,
  CircleX,
  CircleCheck,
  CircleChevronDown,
} from "lucide-react"; // Replace with actual import for icons
import UserDescription from "@/components/UserDescription";

const styles = {
  customRowSpacing: {
    "& .MuiDataGrid-row": {
      // marginBottom: "10px", // Adjust this value for the desired row spacing
    },
  },
};

export default function CustomizedDataGrid() {
  const [showUserDescription, setShowUserDescription] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleUserDescription = (user) => {
    setSelectedUser(user); // Set the selected user
    setShowUserDescription(user ? true : false); // Show if a user is selected
  };

  return (
    <>
      {showUserDescription && selectedUser && (
        <UserDescription user={selectedUser} /> // Display UserDescription before the grid
      )}
      <MyDataGrid
        className="paddingTop:[10px] "
        toggleUserDescription={toggleUserDescription}
      />
    </>
  );
}

// MyDataGrid Component
function MyDataGrid({ toggleUserDescription }) {
  // CSS for custom row spacing

  return (
    <div
      style={{
        height: 350,
        width: "100%",
        padding: "10px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns(toggleUserDescription)} // Pass the function as a parameter
        getRowId={(row) => row.id}
        sx={styles.customRowSpacing} // Apply custom row spacing
      />
    </div>
  );
}

// Render status function
const renderStatus = (status) => {
  let color;
  switch (status) {
    case "Approved":
      break;
    case "Declined":
      break;
    case "Pending":
      break;
    default:
      color = "black";
  }

  return <span style={{ color }}>{status}</span>;
};

// Column definitions
export const columns = (toggleUserDescription) => [
  { field: "Name", headerName: "Name", flex: 1.5, minWidth: 200 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 90,
    renderCell: (params) => renderStatus(params.value), // Use the defined renderStatus function
  },
  {
    field: "Date",
    headerName: "Date",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "eventCount",
    headerName: "Event Count",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "contact",
    headerName: "Contact",
    headerAlign: "center",
    flex: 0.5,
    minWidth: 200,
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <button
          onClick={() => alert(`Calling ${params.value}`)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: "1",
            borderColor: "#037D40",
            padding: "0",
            cursor: "pointer",
            marginRight: "8px",
          }}
        >
          <Phone
            size={29}
            style={{
              color: "#037D40",
              backgroundColor: "#fff",
              borderRadius: "20%",
              border: "2px solid #037D40",
              padding: "5px",
            }}
          />
        </button>
        {params.value}
        <button
          onClick={() => alert(`Emailing ${params.value}`)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: "none",
            padding: "0",
            cursor: "pointer",
            marginLeft: "8px",
          }}
        >
          <Mail
            size={29}
            style={{
              color: "#037D40",
              backgroundColor: "#fff",
              borderRadius: "20%",
              border: "2px solid #037D40",
              padding: "5px",
            }}
          />
        </button>
      </div>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    headerAlign: "center",
    flex: 0.5,
    minWidth: 300,
    renderCell: () => (
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
  {
    headerAlign: "center",
    flex: 0.5,
    minWidth: 200,
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <button
          onClick={() => toggleUserDescription(params.row)} // Pass user data on click
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#037D40",
            border: "none",
            padding: "0",
            cursor: "pointer",
            marginRight: "8px",
          }}
        >
          <CircleChevronDown
            size={30}
            style={{
              color: "#fff",
              padding: "6px",
              backgroundColor: "#037D40",
            }}
          />
        </button>
      </div>
    ),
  },
];

export const rows = [
  {
    id: 1,
    Name: "Homepage Overview",
    status: "Approved",
    Date: "2024-04-10",
    Time: "22.00",
    eventCount: 8345,
  },
  {
    id: 2,
    Name: "Product Details - Gadgets",
    status: "Declined",
    Date: "2024-04-12",
    Time: "22.00",
    eventCount: 5653,
  },
  {
    id: 3,
    Name: "Checkout Process - Step 1",
    status: "Pending",
    Date: "2024-04-15",
    Time: "22.00",
    eventCount: 3455,
  },
];
