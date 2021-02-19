import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

interface v7AuthHeaderProps {}

const V7AuthHeader: React.FC<v7AuthHeaderProps> = () => (
  <>
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6">Language Selector</Typography>
      </Toolbar>
    </AppBar>
  </>
);

export default V7AuthHeader;
