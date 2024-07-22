import {IconButton,Box} from '@mui/material'
import {ChevronLeft,ChevronRight} from '@mui/icons-material'
import React from 'react'

const DrawToggle =({open,handleDrawerOpen, handleDrawerClose})=>
{

return <Box sx={{height:"50px", display:"flex",alignItems:"center",justifyContent:"center"}}>
    <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
        {open ? <ChevronLeft/> : <ChevronRight/>}
    </IconButton>
</Box>
}

export default DrawToggle