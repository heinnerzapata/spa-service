import React from 'react';

import { WithTranslation, withTranslation } from 'react-i18next';

import { NavLink } from 'react-router-dom';
import { Nav, Collapse } from 'reactstrap';

interface ISidebarHelper extends WithTranslation {
  appRoutes: any;
  stateSidebar: any;
  setStateSidebar: any;
  activeRoute: any;
}

const SidebarHelper: React.FC<ISidebarHelper> = ({
  t, appRoutes, stateSidebar, setStateSidebar, activeRoute,
}) => (
  <Nav id="sidebarnav">
    {appRoutes.map((prop: any, key: number) => {
      if (prop.redirect || prop.hide) {
        return null;
      }
      if (prop.navlabel) {
        return (
          <li className="nav-small-cap" key={key}>
            <i className={prop.icon} />
            <span className="hide-menu">{t(`appRouter.${prop.name}`)}</span>
          </li>
        );
      }
      if (prop.collapse) {
        const firstdd: any = {};
        firstdd[prop.state] = !stateSidebar[prop.state];

        return (
          <li
            className={`${activeRoute(prop.path)} sidebar-item`}
            key={key}
          >
            <span
              data-toggle="collapse"
              className="sidebar-link has-arrow"
              aria-expanded={stateSidebar[prop.state]}
              onClick={() => setStateSidebar(firstdd)}
              onKeyDown={() => setStateSidebar(firstdd)}
              role="button"
              tabIndex={key}
            >
              <i className={prop.icon} />
              <span className="hide-menu">{t(`appRouter.${prop.name}`)}</span>
            </span>
            <Collapse isOpen={stateSidebar[prop.state]}>
              <ul className="first-level">
                {prop.child.map((subProp: any, subKey: any) => {
                  if (subProp.redirect) return null;
                  if (subProp.collapse) {
                    const seconddd: any = {};
                    seconddd[subProp.state] = stateSidebar[subProp.state];

                    return (
                      <li
                        className={`${activeRoute(subProp.path)}  sidebar-item`}
                        key={subKey}
                      >
                        <span
                          data-toggle="collapse"
                          className="sidebar-link has-arrow"
                          aria-expanded={stateSidebar[subProp.state]}
                          onClick={() => setStateSidebar(seconddd)}
                          onKeyDown={() => setStateSidebar(seconddd)}
                          role="button"
                          tabIndex={subKey}
                        >
                          <i className={subProp.icon} />
                          <span className="hide-menu">
                            {t(`appRouter.${subProp.name}`)}
                          </span>
                        </span>
                        <Collapse isOpen={stateSidebar[subProp.state]}>
                          <ul className="second-level">
                            {subProp.subchild.map((subSubProp: any, subSubKey: any) => {
                              if (subSubProp.redirect) return null;

                              return (
                                <li
                                  className={`${activeRoute(subSubProp.path)} sidebar-item`}
                                  key={subSubKey}
                                >
                                  <NavLink
                                    to={subSubProp.path}
                                    activeClassName="active"
                                    className="sidebar-link"
                                  >
                                    <i className={subSubProp.icon} />
                                    <span className="hide-menu">
                                      {t(`appRouter.${subSubProp.name}`)}
                                    </span>
                                  </NavLink>
                                </li>
                              );
                            })}
                          </ul>
                        </Collapse>
                      </li>
                    );
                  }

                  return (
                    <li
                      className={
                        `${activeRoute(subProp.path)}${subProp.pro ? ' active active-pro' : ''}  sidebar-item`
                      }
                      key={subKey}
                    >
                      <NavLink
                        to={subProp.path}
                        className="sidebar-link"
                        activeClassName="active"
                      >
                        <i className={subProp.icon} />
                        <span className="hide-menu">{t(`appRouter.${subProp.name}`)}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </Collapse>
          </li>
        );
      }

      return (
        <li
          className={
            `${activeRoute(prop.path)}${prop.pro ? ' active active-pro' : ''} sidebar-item`
          }
          key={key}
        >
          <NavLink
            to={prop.path}
            className="sidebar-link"
            activeClassName="active"
          >
            <i className={prop.icon} />
            <span className="hide-menu">{t(`appRouter.${prop.name}`)}</span>
          </NavLink>
        </li>
      );
    })}
  </Nav>
);

export default withTranslation('translation')(SidebarHelper);
