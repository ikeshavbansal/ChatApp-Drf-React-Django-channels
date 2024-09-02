import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    ListItemButton,
    useTheme,
  } from '@mui/material';
  import React from 'react';
  import ListItemAvatar from '@mui/material/ListItemAvatar';
  import Avatar from '@mui/material/Avatar';
  import { MEDIA_URL } from '../../config';
  import { Link } from 'react-router-dom';
  import { useParams } from 'react-router-dom';
  
  const ServerChannel = ({data}) => {

    const theme = useTheme();
    const server_name = data?.[0]?.name ?? "Server"
    const {serverId} = useParams()
   
    console.log(data,"/////")
    return (
      <>
        <Box
          sx={{
            height: 50,
            display: 'flex',
            alignItems: 'center',
            px: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            position: 'sticky',
            top: 0,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography variant='body1' style={{textOverlow:"ellipsis" , overflow :"hidden" , whitespace:"nowrap"}}>{server_name}</Typography>
        </Box>
        <List sx={{ width: '100%' }}>
          {data.flatMap((obj) => obj.channel_server.map(category=>(
            <ListItem
              key={category.id}
              disablePadding
              sx={{ display: 'block', maxHeight:"40pxm" }}
              dense={true}
            >
              <Link
                to={`/server/${serverId}/${category.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemButton sx={{ minHeight: 0, justifyContent: 'center' }}>
                  
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.2,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {category.name}
                      </Typography>
                    }
                    primaryTypographyProps={{
                      sx: {
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                      },
                    }}
                  ></ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          )))}
        </List>
      </>
    );
  };
  
  export default ServerChannel;