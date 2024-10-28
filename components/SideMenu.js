import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      {/* Profile Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <Avatar
          alt="John Doe"
          src="user.jpg" // Adjust the path if needed
          sx={{
            width: 60,
            height: 60,
            mb: 1,
          }}
        />
        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
          John Doe
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Web Developer
        </Typography>
      </Box>

      <Divider />

      {/* Sidebar Content */}
      {/* <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box> */}
      <Divider />
      <MenuContent />

      {/* Additional Options */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <OptionsMenu />
      </Box>
    </Drawer>
  );
}
