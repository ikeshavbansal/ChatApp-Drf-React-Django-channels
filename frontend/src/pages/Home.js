import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import Main from "./templates/Main";
import PopularChannels from "../components/PrimaryDraw/PopularChannels";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories";
import ExploreServers from "../components/Main/ExploreServer";

const Home=()=>
{
    return <>
<Box sx={{display:'flex'}}>
    <CssBaseline/>
    <PrimaryAppBar/>
    <PrimaryDrawer>
        <PopularChannels open={false}/>
    </PrimaryDrawer>
    <SecondaryDrawer>
        <ExploreCategories/>
    </SecondaryDrawer>
    <Main>
        <ExploreServers/>
    </Main>
</Box>
    </>
}
export default Home