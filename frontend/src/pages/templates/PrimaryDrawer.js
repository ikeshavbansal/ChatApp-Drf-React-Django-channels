import { Box, Typography, useMediaQuery, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import React from 'react';
import DrawToggle from '../../components/PrimaryDraw/DrawToggle.js';
import MuiDrawer from '@mui/material/Drawer';

const PrimaryDraw = ({ children }) => {
  const isBelowSm = useMediaQuery('(max-width: 599px)');
  const [open, setOpen] = useState(!isBelowSm);
  const theme = useTheme();

  const openedMixin = () => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = () => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    width: `${theme.primaryDrawer.onCloseWidth}px`,
  });

  const Drawer = styled(
    MuiDrawer,
    {}
  )(({ theme, open }) => ({
    width: `${theme.primaryDrawer.width}px`,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(),
      '& .MuiDrawer-paper': openedMixin(),
    }),
    ...(!open && {
      ...closedMixin(),
      '& .MuiDrawer-paper': closedMixin(),
    }),
  }));

  useEffect(() => {
    setOpen(!isBelowSm);
  }, [isBelowSm]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      variant={isBelowSm ? 'temporary' : 'permanent'}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: theme.primaryDrawer.width,
        },
      }}
    >
      <Box>
        {React.Children.map(children, (child) => {
          return React.isValidElement(child)
            ? React.cloneElement(child, { open: open })
            : child;
        })}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            p: 0,
            width: open ? 'auto' : '100%',
          }}
        >
          <DrawToggle
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default PrimaryDraw;