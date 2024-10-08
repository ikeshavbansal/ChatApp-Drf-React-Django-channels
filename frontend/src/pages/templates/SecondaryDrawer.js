import {Box, Typography} from '@mui/material'
import {useTheme } from '@mui/material/styles'


const SecondaryDrawer=({children})=>
{
    const theme = useTheme();
 return <Box sx={{
    minWidth: `${theme.secondaryDrawer.width}px`,
    height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
    overflowY: 'auto',
    mt: `${theme.primaryAppBar.height}px`,
    borderRight: `1px solid ${theme.palette.divider}`,
    display: { xs: 'none', sm: 'block' },
  }}>
{children}
    </Box>
}

export default SecondaryDrawer