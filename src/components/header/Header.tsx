import * as React from 'react';
import { AppBar, CssBaseline, Slide, useScrollTrigger } from '@mui/material';
import { HeaderContent } from '..';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header() {
  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <AppBar position="sticky">
          <HeaderContent />
        </AppBar>
      </HideOnScroll>
    </>
  );
}
export default Header;
