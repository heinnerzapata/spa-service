import React from 'react';

import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';

const V7HeaderNotificator: React.FC = () => (
  <UncontrolledDropdown nav inNavbar>
    <DropdownToggle nav caret>
      <i className="mdi mdi-bell" />
      <div className="notify">
        <span className="point" />
      </div>
    </DropdownToggle>
    <DropdownMenu right className="mailbox">
      <div className="p-4 text-dark border-bottom">
        <h6 className="mb-0 font-medium">Notifications</h6>
      </div>
      <div className="message-center notifications">
        <span className="message-item" key={0}>
          <span
            className="btn btn-circle btn-danger"
          >
            <i className="fa fa-link" />
          </span>
          <div className="mail-contnet">
            <h5 className="message-title">
              Link devices
            </h5>
            <span className="mail-desc">
              Your company have new devices to link!
            </span>
            <span className="time">9:30 AM</span>
          </div>
        </span>
      </div>
      <a className="nav-link text-center mb-1 text-muted" href=";">
        <strong>Check all notifications</strong>
        <i className="fa fa-angle-right" />
      </a>
    </DropdownMenu>
  </UncontrolledDropdown>
);

export default V7HeaderNotificator;
