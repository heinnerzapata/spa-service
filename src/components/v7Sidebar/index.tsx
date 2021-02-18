import React, { useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import SidebarHelper from 'utilities/sidebarHelper';

interface IV7SidebarProps {
  appRoutes: any;
  data: any;
}

const V7Sidebar: React.FC<IV7SidebarProps> = (props) => {
  const { appRoutes, data } = props;

  const activeRoute = (routeName: any) => (window.location.pathname.indexOf(routeName) > -1 ? 'selected' : '');

  const expandLogo = () => {
    const logobg = document.getElementById('logobg');
    logobg?.classList.toggle('expand-logo');
  };

  const [stateSidebar, setStateSidebar] = useState<any>({
    authentication: activeRoute('/auth') !== '',
    dashboardpages: activeRoute('/dahboards') !== '',
    dropdownOpen: false,
  });

  return (
    <aside
      className="left-sidebar"
      id="sidebarbg"
      data-sidebarbg={data.settings[0].sidebarbg}
      onMouseEnter={expandLogo}
      onMouseLeave={expandLogo}
    >
      <div className="scroll-sidebar">
        <PerfectScrollbar className="sidebar-nav">
          <SidebarHelper
            appRoutes={appRoutes}
            stateSidebar={stateSidebar}
            setStateSidebar={setStateSidebar}
            activeRoute={activeRoute}
          />
        </PerfectScrollbar>
      </div>
    </aside>
  );
};

export default V7Sidebar;
