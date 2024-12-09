import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { Phone, Mail } from "lucide-react";
import Button from "@mui/material/Button";
import { CircleX, CircleCheck, CircleChevronDown } from "lucide-react";
import { DataGrid } from "@mui/x-data-grid"; // Ensure you import DataGrid

// CSS for custom row spacing
const styles = {
  customRowSpacing: {
    "& .MuiDataGrid-row": {
      marginBottom: "10px", // Adjust this value for the desired row spacing
    },
  },
};

// Function to get days in a month
function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString("en-US", {
    month: "short",
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

// Function to render sparkline cell
function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={["hsl(210, 98%, 42%)"]}
        xAxis={{
          scaleType: "band",
          data,
        }}
      />
    </div>
  );
}

// Function to render status
function renderStatus(status) {
  const colors = {
    Approved: "success",
    Declined: "default",
    Pending: "default",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

// Function to render avatar
export function renderAvatar(params) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: "24px",
        height: "24px",
        fontSize: "0.85rem",
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

// Column definitions
export const columns = [
  { field: "Name", headerName: "Name", flex: 1.5, minWidth: 200 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 90,
    renderCell: (params) => renderStatus(params.value),
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

  {
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
              backgroundColor: "#037D40",
              borderRadius: "20%",

              padding: "6px",
            }}
          />
        </button>
      </div>
    ),
  },
];

// Row data
export const rows = [
  {
    id: 1,
    Name: "Homepage Overview",
    status: "Approved",
    Date: "2024-04-10",
    eventCount: 8345,
  },
  {
    id: 2,
    Name: "Product Details - Gadgets",
    status: "Declined",
    Date: "2024-04-12",
    eventCount: 5653,
  },
  {
    id: 3,
    Name: "Checkout Process - Step 1",
    status: "Pending",
    Date: "2024-04-15",
    eventCount: 3455,
  },
];

export default function MyDataGrid() {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        sx={styles.customRowSpacing} // Apply custom row spacing
      />
    </div>
  );
}
