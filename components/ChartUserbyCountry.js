import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const data = [
  { label: 'Approved', value: 60000 },
  { label: 'Declined', value: 25000 },
  { label: 'Not Reviewed', value: 13000 },
];

const stats = [
  {
    name: 'Approved',
    value: 60,
    color: 'hsl(120, 40%, 50%)', // Green for approved
  },
  {
    name: 'Declined',
    value: 25,
    color: 'hsl(0, 70%, 50%)', // Red for declined
  },
  {
    name: 'Not Reviewed',
    value: 15,
    color: 'hsl(30, 60%, 50%)', // Orange for not reviewed
  },
];

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
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

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const colors = [
  'hsl(120, 40%, 50%)', // Green
  'hsl(0, 70%, 50%)',   // Red
  'hsl(30, 60%, 50%)',  // Orange
];

export default function BookingRequestStats() {
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Statistics of Booking Request
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
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
        
        {/* Horizontal Stack for stats with wrapping */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            mt: 2,
          }}
        >
          {stats.map((stat, index) => (
            <Stack
              key={index}
              direction="column"
              sx={{
                alignItems: 'center',
                gap: 1,
                minWidth: { xs: '100%', sm: '30%' },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: '500' }}>
                {stat.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {stat.value}%
              </Typography>
              <LinearProgress
                variant="determinate"
                aria-label={`Booking requests ${stat.name}`}
                value={stat.value}
                sx={{
                  width: '100%',
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: stat.color,
                  },
                }}
              />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
