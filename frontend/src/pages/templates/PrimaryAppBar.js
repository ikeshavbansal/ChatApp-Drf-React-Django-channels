import * as React from 'react';
import {useState,useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useTheme} from "@mui/material/styles"
import Link from '@mui/material/Link';
import {Drawer} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';



const PrimaryAppBar=()=>
{
    const [sideMenu,setSideMenu] = useState(false)
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(()=>
    {
        if(isSmallScreen && sideMenu)
        {
            setSideMenu(false)
        }
        
    },[isSmallScreen]
    )

    const toggleDrawer = (open) => (event) => {
        if (
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
        setSideMenu(open);
      };
    return (
      <AppBar sx={{zIndex: (theme) => theme.zIndex.drawer +2, backgroundColor:theme.palette.background.default, borderBottom:`1px solid ${theme.palette.divider }`}}>
        <Toolbar variant="dense" sx={{height:theme.primaryAppBar.height,minHeight:theme.primaryAppBar.height}}>
        <Box sx={{display:{xs:"block", sm:"none"}}}>
            <IconButton color='inherit' aria-label='open drawer' edge='start' sx={{mr:2}} onClick={toggleDrawer(!sideMenu)}>
                <MenuIcon/>
            </IconButton>
        </Box>

        <Drawer anchor='left' open={sideMenu} onClose={toggleDrawer(false)}>
            {[...Array(100)].map((_,i)=> <Typography key={i} paragraph>{ i+1}</Typography>)}
        </Drawer>
          <Link href='/' underline='none' color="inherit">
            <Typography variant='h5' noWrap components="div" sx={{ display:{fontWeight: 700, letterSpacing: "-0.5px" }}}>
                ChikChik 
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    )
}
export default PrimaryAppBar