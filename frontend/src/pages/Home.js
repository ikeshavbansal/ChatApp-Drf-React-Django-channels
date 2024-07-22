import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import Main from "./templates/Main";
import PopularChannels from "../components/PrimaryDraw/PopularChannels";

const Home=()=>
{
    return <>
<Box sx={{display:'flex'}}>
<CssBaseline/>
<PrimaryAppBar/>
<PrimaryDrawer>
    <PopularChannels open={false}/>
</PrimaryDrawer>
<SecondaryDrawer/>
<Main/>
</Box>
    </>
}
export default Home