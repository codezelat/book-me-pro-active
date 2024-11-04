import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "../app/internals/data/gridData";
import { useState } from "react";

export default function CustomizedDataGrid() {
  const [showUserDescription, setShowUserDescription] = useState(false);

  const toggleUserDescription = () => {
    setShowUserDescription((prev) => !prev);
  };
  return (
    <>
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
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
    
    </>
  );
}
