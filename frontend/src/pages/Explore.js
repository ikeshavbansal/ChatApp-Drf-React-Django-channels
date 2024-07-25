import React from 'react';
import PrimaryAppBar from './templates/PrimaryAppBar';
import PrimaryDrawer from './templates/PrimaryDrawer';
import { Box, CssBaseline } from '@mui/material';
import SecondaryDrawer from './templates/SecondaryDrawer';
import PopularChannels from '../components/PrimaryDraw/PopularChannels';
import ExploreCategories from '../components/SecondaryDraw/ExploreCategories';
import Main from './templates/Main';
import ExploreServers from '../components/Main/ExploreServer';

const Explore = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDrawer>
        <PopularChannels open={false} />
      </PrimaryDrawer>
      <SecondaryDrawer>
        <ExploreCategories />
      </SecondaryDrawer>
      <Main>
        <ExploreServers />
      </Main>
    </Box>
  );
};

export default Explore;