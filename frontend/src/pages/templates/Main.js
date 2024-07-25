
import {Box, Typography} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import { Children } from 'react'
const Main=({children})=>
{
    const theme = useTheme()
    return(
        <Box sx={{flexGrow:1, mt: `${theme.primaryAppBar.height}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        overflow: 'hidden'
        }}>
        {children}
        </Box>
    )  

}

export default Main