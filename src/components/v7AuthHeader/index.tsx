import React from 'react';

import {
  AppBar, Toolbar, Grid,
} from '@material-ui/core';
import { V7LanguageSelector } from 'components';

interface v7AuthHeaderProps {}

const V7AuthHeader: React.FC<v7AuthHeaderProps> = () => (
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

export default V7AuthHeader;
