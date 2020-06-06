import React, { Component } from 'react';
import { PROFILE_OPTIONS, PROFILE_IMAGE_STYLES } from './profile.constants';
import { Row, Col } from 'react-flexbox-grid';
import { NavItem } from 'react-materialize';
import { V7Dropdown, V7Image } from 'uiComponents/components';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { cleanToken, cleanUserInfo } from 'store/user/actions';
import _ from 'lodash';

class Profile extends Component {
  closeSession = () => {
    let userInfo = localStorage.getItem('userInfo');
    let token = localStorage.getItem('token');

    this.props.dispatch(cleanToken());
    this.props.dispatch(cleanUserInfo());

    if (!_.isNil(userInfo) && userInfo !== 'null') {
      localStorage.removeItem('token');
    }

    if (!_.isNil(token) && token !== 'null') {
      localStorage.removeItem('userInfo');
    }

    this.props.history.push('/')
  }

  getProfileImageStyles() {
    return {...PROFILE_IMAGE_STYLES, width: this.props.width, height: this.props.height};
  }

  getUserImage = () => {
    return (
      <V7Image src={this.props.userReducer.userInfo.avatar} style={this.getProfileImageStyles()} />
    );
  };

  handleSessionClick = (e, object) => {
    switch (object) {
      case PROFILE_OPTIONS[0]: {
        this.props.history.push('/profile');
        break;
      }
      case PROFILE_OPTIONS[1]: {
        this.closeSession();
        break;
      }
      default: break; 
    }
  }

  render() {
    const { t } = this.props;
    let profileOptionsList = PROFILE_OPTIONS.map((object, i) => {
      return (
        <NavItem
          key={i}
          onClick={(e) => { this.handleSessionClick(e, object) }}>
          <Row middle="xs"
            center="xs">
            <Col>
              <span>{t(`components.header.menu.${object}`)}</span>
            </Col>
          </Row>
        </NavItem>
      )
    });
    return (
      <V7Dropdown
        trigger={this.getUserImage()}
        list={profileOptionsList} />
    )
  }
}

export default connect(state => state)(withTranslation('common')(withRouter(Profile)));