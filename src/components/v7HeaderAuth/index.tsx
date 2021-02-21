import React from 'react';

import {
  AppBar, Toolbar, Grid,
} from '@material-ui/core';
import { V7LanguageSelector } from 'components';

interface v7HeaderAuthProps {}

const V7HeaderAuth: React.FC<v7HeaderAuthProps> = () => (
  <>
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Grid container spacing={2} justify="flex-end">
          <V7LanguageSelector />
        </Grid>
      </Toolbar>
    </AppBar>
  </>
);

export default V7HeaderAuth;
