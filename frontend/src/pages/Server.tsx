import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import Main from "./templates/Main";
import MessageInterface from "../components/Main/MessageInterface.tsx";
import ServerChannel from "../components/SecondaryDraw/ServerChannel.tsx";
import UserServers from "../components/PrimaryDraw/UserServers.tsx";
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud.tsx";
import { Servers } from "../@types/server";
import { useEffect } from "react";


const Server=()=>
{

    const navigate = useNavigate()
    const {serverId,channelId} = useParams()

    const { dataCRUD, fetchData, error, isloading } = useCrud<Servers>(
        [],
        `server/select/?by_serverId=${serverId}`
    );
    
    if(error !== null && error.message === "400"){
        console.log(error.message)
        navigate('/');
        
    }

    useEffect(() => {
        fetchData();
      }, []);
    
    
        
      
      
const isChannel = ()=>
{
    if(!channelId)
    {
        return true;
    } 
    else{
        return dataCRUD.some((server)=>
        server.channel_server.some((channel)=>channel.id === parseInt(channelId)))
    }
}

useEffect(()=>
{
if(!isChannel())
{
    navigate(`/server/${serverId}`)
}
},[isChannel,channelId])

    return (
<Box sx={{display:'flex'}}>
    <CssBaseline/>
    <PrimaryAppBar/>
    
    <PrimaryDrawer>
    <UserServers open={false} data={dataCRUD}/>
    </PrimaryDrawer>
    <SecondaryDrawer>
      <ServerChannel data={dataCRUD}/>
    </SecondaryDrawer>
    <Main>
        <MessageInterface data ={dataCRUD}/>
    </Main>
</Box>
    )
}
export default Server