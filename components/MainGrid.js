import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../app/internals/components/copyright";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import BookingRequestStats from "./BookingRequestStats";

const data = [
  {
    title: "Today's Bookings",
    value: "14k",
    interval: "Last 30 days",
    trend: "up",
    data: [
      /* data omitted for brevity */
    ],
  },
  {
    title: "Booking Requests",
    value: "325",
    interval: "Last 30 days",
    trend: "down",
    data: [
      /* data omitted for brevity */
    ],
  },
  {
    title: "Profile Clicks",
    value: "200k",
    interval: "Last 30 days",
    trend: "neutral",
    data: [
      /* data omitted for brevity */
    ],
  },
];

export default function MainGrid() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", md: "1700px" },
        px: { xs: 2, md: 3 },
      }}
    >
      {/* Stat cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {data.map((card, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              width: "402px",
              height: "159px",
              padding: "22px 9px 22px 4px",
              gap: "20px",
              borderRadius: "5px 0px 0px 0px",
            }}
          >
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} lg={3}>
          {/* <HighlightedCard /> */}
        </Grid>
      </Grid>

      {/* Flex container for BookingRequestStats and SessionsChart */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: { md: "1236px" },
          height: { xs: "auto", md: "370px" },
          mb: 5,
        }}
      >
        
          <BookingRequestStats />
        

        <Box
          sx={{
            width: { xs: "100%", md: "969px" },
            height: { xs: "300px", md: "370px" },
            borderRadius: "5px 0px 0px 0px",
          }}
        >
          <SessionsChart />
        </Box>
      </Stack>

      {/* CustomizedDataGrid and additional components */}
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: { md: "1236px" },
          mb: 2,
        }}
      >
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            width: "100%",
            height: "354px",
          }}
        >
          <CustomizedDataGrid />
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            width: "100%",
            height: "354px",
          }}
        >
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            {/* <CustomizedTreeView />
                <ChartUserByCountry /> */}
          </Stack>
        </Grid>
      </Grid>

      {/* <Copyright sx={{ my: 4 }} /> */}
    </Box>
  );
}
