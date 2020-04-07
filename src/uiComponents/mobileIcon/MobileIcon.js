import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MobileIcon.scss';

class MobileIcon extends Component {
  constructor(props) {
    super(props);
    this.state = { isIconClicked: false };
  }

  menuMobileChangeEvent = (e) => {
    this.props.menuMobileChangeEvent('menu-mobile-change', e)
  }

  handleClick = (e) => {
    e.preventDefault();
    this.clickMobileMenu();
  }

  clickMobileMenu = () => {
    this.setState({ isIconClicked: !this.state.isIconClicked });
    this.menuMobileChangeEvent(this.state.isIconClicked);
  }

  componentDidMount = () => {
    this.props.onRef(this)
  }

  componentWillUnmount = () => {
    this.props.onRef(undefined)
  }

  render() {
    const containerStyle = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`
    };
    return (
      <section
        style={containerStyle}
        className={[
          'mobile-icon',
          this.state.isIconClicked
            ? 'mobile-icon--clicked'
            : 'mobile-icon--notClicked'
        ].join(' ')}
        onClick={this.handleClick}
      >
        <span className="mobile-icon__item" />
        <span className="mobile-icon__item" />
        <span className="mobile-icon__item" />
      </section>
    );
  }
}

MobileIcon.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  menuMobileChangeEvent: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired
}

export default MobileIcon;
