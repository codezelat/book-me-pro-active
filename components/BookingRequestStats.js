import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const data = [
  { label: "Approved", value: 60000 },
  { label: "Declined", value: 25000 },
  { label: "Not Reviewed", value: 13000 },
];

const stats = [
  {
    value: 60,
    name: "Approved",

    color: " #037D40",
  },
  {
    value: 25,
    name: "Not Reviewed",

    color: "#8BC3A7",
  },
  {
    value: 15,
    name: "Declined",

    color: "#D50000",
  },
];

const StyledText = styled("text", {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ theme }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: "primary",
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== "primary",
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: "primary",
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== "primary",
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

const colors = ["#037D40", "#D50000", "#8BC3A7"];

export default function BookingRequestStats() {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flexGrow: 1,
      }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Statistics of Booking Request
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
              width: "216.78px",
              height: "216.78px",
            }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: "global", highlighted: "item" },
              },
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel primaryText="98K" secondaryText="Total Requests" />
          </PieChart>
        </Box>

        {/* Row with name and value for each item */}
        <Stack
          direction="row"
          spacing={5} // No gap
          sx={{
            //justifyContent: "space-between",
            width: "160px",
            height: "20px",
            mx:2
          }}
        >
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                textAlign: "center",
                color: stat.color,
                
              }}
            >
              <Typography variant="body2" sx={{  }}>
                {stat.value}%
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: "500",
                  fontSize: "12px",
                }}
              >
                {stat.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
