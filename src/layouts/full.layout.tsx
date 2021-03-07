/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import V7Header from 'containers/v7Header';
import { V7Sidebar } from 'components';
import RouterAppHelper from 'utilities/routerAppHelper';
import { appRoutes } from 'router/router.app';
import V7MainContainer from 'containers/V7MainContainer';

interface IFullLayoutProps {
  history: any;
}

const FullLayout: React.FC<IFullLayoutProps> = (props) => {
  const [stateLayout, setStateLayout] = useState({
    isOpen: false,
    width: window.innerWidth,
    settings: [
      {
        theme: 'dark',
        layout: 'vertical',
        dir: 'ltr',
        sidebartype: 'mini-sidebar',
        sidebarpos: 'fixed',
        headerpos: 'fixed',
        boxed: 'full',
        navbarbg: 'skin1',
        sidebarbg: 'skin1',
        logobg: 'skin1',
      },
    ],
  });

  props.history.listen((location: any, action: any) => {
    if (
      window.innerWidth < 767
      && document
        .getElementById('main-wrapper')
        ?.className.indexOf('show-sidebar') !== -1
    ) {
      const mainWrapper = document.getElementById('main-wrapper');
      mainWrapper?.classList.toggle('show-sidebar');
    }
  });

  const updateDimensions = () => {
    const element = document.getElementById('main-wrapper');

    setStateLayout({
      ...stateLayout,
      width: window.innerWidth,
    });

    switch (stateLayout.settings[0].sidebartype) {
      case 'full':
      case 'iconbar':
        if (stateLayout.width < 1170) {
          element?.setAttribute('data-sidebartype', 'mini-sidebar');
          element?.classList.add('mini-sidebar');
        } else {
          element?.setAttribute(
            'data-sidebartype',
            stateLayout.settings[0].sidebartype,
          );
          element?.classList.remove('mini-sidebar');
        }
        break;

      case 'overlay':
        if (stateLayout.width < 767) {
          element?.setAttribute('data-sidebartype', 'mini-sidebar');
        } else {
          element?.setAttribute(
            'data-sidebartype',
            stateLayout.settings[0].sidebartype,
          );
        }
        break;

      default:
    }
  };

  useEffect(() => {
    window.removeEventListener('load', updateDimensions);
    window.removeEventListener('resize', updateDimensions);
  });

  return (
    <div
      id="main-wrapper"
      dir={stateLayout.settings[0].dir}
      data-theme={stateLayout.settings[0].theme}
      data-layout={stateLayout.settings[0].layout}
      data-sidebartype={stateLayout.settings[0].sidebartype}
      data-sidebar-position={stateLayout.settings[0].sidebarpos}
      data-header-position={stateLayout.settings[0].headerpos}
      data-boxed-layout={stateLayout.settings[0].boxed}
    >
      <V7MainContainer shouldAuth>
        <V7Header stateLayout={stateLayout} />
        <V7Sidebar data={stateLayout} {...props} appRoutes={appRoutes} />
        <div className="page-wrapper d-block">
          <div
            className="page-content container-fluid"
          >
            <RouterAppHelper appRoutes={appRoutes} />
          </div>
        </div>
      </V7MainContainer>
    </div>
  );
};

export default withRouter(FullLayout);
