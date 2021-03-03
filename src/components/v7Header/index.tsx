/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WithTranslation } from 'react-i18next';

import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Collapse,
} from 'reactstrap';

import { V7HeaderNotificator, V7HeaderProfiler } from 'components';
import { IUserState } from 'store/user/reducer';

import { physicalPaths } from 'router/router.app';

import logov7icon from '../../assets/images/logo-vol7er-icon.png';
import logov7text from '../../assets/images/logo-vol7er-text.png';

interface IV7HeaderProps {
  t: any;
  stateLayout: any;
  userReducer?: IUserState;
}

const V7Header: React.FC<IV7HeaderProps> = (props) => {
  const location = useLocation();

  const [stateHeader, setStateHeader] = useState({
    isOpen: false,
  });

  const [stateNameActiveRoute, setStateNameActiveRoute] = useState('');

  const toggle = () => {
    setStateHeader({
      ...stateHeader,
      isOpen: !stateHeader.isOpen,
    });
  };

  const showMobilemenu = () => {
    document.getElementById('main-wrapper')?.classList.toggle('show-sidebar');
  };

  const sidebarHandler = () => {
    const element = document.getElementById('main-wrapper');
    switch (props.stateLayout.settings[0].sidebartype) {
      case 'full':
      case 'iconbar':
        element?.classList.toggle('mini-sidebar');
        if (element?.classList.contains('mini-sidebar')) {
          element?.setAttribute('data-sidebartype', 'mini-sidebar');
        } else {
          element?.setAttribute(
            'data-sidebartype',
            props.stateLayout.settings[0].sidebartype,
          );
        }
        break;
      case 'overlay':
      case 'mini-sidebar':
        element?.classList.toggle('full');
        if (element?.classList.contains('full')) {
          element?.setAttribute('data-sidebartype', 'full');
        } else {
          element?.setAttribute(
            'data-sidebartype',
            props.stateLayout.settings[0].sidebartype,
          );
        }
        break;

      default:
    }
  };

  useEffect(() => {
    const actualRoute: string = window.location.pathname;

    setStateNameActiveRoute(physicalPaths[actualRoute].name);
  }, [location]);

  return (
    <header
      className="topbar navbarbg"
      data-navbarbg={props.stateLayout.settings[0].navbarbg}
    >
      <Navbar
        className={`top-navbar ${
          props.stateLayout.settings[0].navbarbg === 'skin6'
            ? 'navbar-light'
            : 'navbar-dark'
        }`}
        expand="md"
      >
        <div
          className="navbar-header"
          id="logobg"
          data-logobg={props.stateLayout.settings[0].logobg}
        >
          <span
            className="nav-toggler d-block d-md-none text-white"
            onClick={showMobilemenu}
            onKeyDown={showMobilemenu}
            role="button"
            tabIndex={0}
          >
            <i className="ti-menu ti-close" />
          </span>
          <NavbarBrand href="/">
            <b className="logo-icon">
              <img src={logov7icon} alt="homepage" className="light-logo" />
            </b>
            <span className="logo-text">
              <img src={logov7text} className="light-logo" alt="homepage" />
            </span>
          </NavbarBrand>
          <span
            className="topbartoggler d-block d-md-none text-white"
            onClick={toggle}
            onKeyDown={toggle}
            role="button"
            tabIndex={-1}
          >
            <i className="ti-more" />
          </span>
        </div>
        <Collapse
          className="navbarbg"
          isOpen={stateHeader.isOpen}
          navbar
          data-navbarbg={props.stateLayout.settings[0].navbarbg}
        >
          <Nav className="float-left" navbar>
            <NavItem>
              <NavLink
                href="#"
                className="d-none d-md-block"
                onClick={sidebarHandler}
              >
                <i className="ti-menu" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white d-none d-md-block">
                {props.t(`appRouter.${stateNameActiveRoute}`)}
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto float-right" navbar>
            <V7HeaderNotificator />
            <V7HeaderProfiler t={props.t} userReducer={props.userReducer} />
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default V7Header;
