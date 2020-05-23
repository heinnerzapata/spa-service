import React, { Component } from "react";
import Logo from "../logo/Logo";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import MobileIcon from "../mobileIcon/MobileIcon";
import Profile from "../containers/profile/profile";
import V7Chip from "../v7Chip/V7Chip";
import Language from "../containers/language/language";
import { connect } from "react-redux";
import "./Header.scss";
import "font-awesome/css/font-awesome.min.css";
import { withTranslation } from "react-i18next";
import { DEFAULT_CONFIG } from "../../variables/constants/constants";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStrollTop: true,
      isMenuMobileVisible: false,
      language: this.props.t(`languages.${DEFAULT_CONFIG.defaultLanguage}`)
    };
    window.scrollTo(0, 0);
    this.handleScroll = this.handleScroll.bind(this);
    this.validateScrollPosition = this.validateScrollPosition.bind(this);
    this.handleMenuMobileChange = this.handleMenuMobileChange.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
  }

  validateScrollPosition() {
    if (window.scrollY > 0) {
      this.setState({ isStrollTop: false });
    } else {
      this.setState({ isStrollTop: true });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.validateScrollPosition();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(event) {
    this.validateScrollPosition();
  }

  handleMenuMobileChange(key, e) {
    if (key === "menu-mobile-change") {
      this.setState({ ...this.state, isMenuMobileVisible: !e });
    }
  }

  closeMobileMenu(e) {
    this.setState({ isMenuMobileVisible: false });
    this.mobileIconComponent.clickMobileMenu();
  }

  render() {
    const { t } = this.props;
    return (
      <header
        className={[
          "vol7er-header",
          this.state.isStrollTop
            ? "vol7er-header--top"
            : "vol7er-header--scrolled"
        ].join(" ")}
      >
        <div
          className={[
            "vol7er-header__options-mobile",
            this.state.isMenuMobileVisible
              ? "vol7er-header__options-mobile--notVisible"
              : "vol7er-header__options-mobile--visible"
          ].join(" ")}
        >
          <ul className="vol7er-header__options-mobile__menu">
            {/* <li className="vol7er-header__options-mobile__menu__item vol7er-header__options-mobile-whitef">
              <Link to="/about" onClick={this.closeMobileMenu}>
                {t("components.header.menu.about")}
              </Link>
            </li> */}
            {!!!this.props.userReducer.userInfo.hexId && (
              <li className="vol7er-header__options-mobile__menu__item vol7er-header__options-mobile-whitef">
                <Link to="/signup" onClick={this.closeMobileMenu}>
                  {t("components.header.menu.signup")}
                </Link>
              </li>
            )}
            {!!!this.props.userReducer.userInfo.hexId && (
              <li className="vol7er-header__options-mobile__menu__item vol7er-header__options-mobile-whitef">
                <Link to="/signin" onClick={this.closeMobileMenu}>
                  {t("components.header.menu.signin")}
                </Link>
              </li>
            )}
            {!!this.props.userReducer.userInfo.hexId && (
              <li className="vol7er-header__options-mobile__menu__item">
                <Profile width={60} />
              </li>
            )}
            <li className="vol7er-header__options-mobile__menu__item">
              <Language width={60} />
            </li>
          </ul>
        </div>
        <div className="vol7er-header__icon-bars">
          {/* <i className="fa fa-bars fa-2x" /> */}
          <MobileIcon
            height={40}
            width={40}
            menuMobileChangeEvent={this.handleMenuMobileChange}
            onRef={ref => (this.mobileIconComponent = ref)}
          />
        </div>
        <Grid>
          <Row
            className={[
              "vol7er-header__row",
              this.state.isStrollTop
                ? "vol7er-header__row--top"
                : "vol7er-header__row--scrolled"
            ].join(" ")}
            middle="xs"
          >
            <Col xs={12} lg={4}>
              <Row center="xs" start="lg" middle="xs">
                <Col xs={12}>
                  <Link className="vol7er-header__row--logo" to="/">
                    <Logo
                      isStrollTop={this.state.isStrollTop ? true : false}
                      fontSize={26}
                    />
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col xs={12} lg={8} className="vol7er-header__options">
              <Row end="lg" center="xs" middle="xs">
                {/* <Col>
                  <V7Chip className="vol7er-header__options__menu--option">
                    <Link to="/about">{t("components.header.menu.about")}</Link>
                  </V7Chip>
                </Col> */}
                {!!this.props.userReducer.userInfo.hexId && (
                  <Col>
                    <V7Chip className="vol7er-header__options__menu--option">
                      <Link to="/dashboard">
                        {t("components.header.menu.dashboard")}
                      </Link>
                    </V7Chip>
                  </Col>
                )}
                {!!!this.props.userReducer.userInfo.hexId && (
                  <Col>
                    <V7Chip className="vol7er-header__options__menu--option">
                      <Link to="/signup">
                        {t("components.header.menu.signup")}
                      </Link>
                    </V7Chip>
                  </Col>
                )}
                {!!!this.props.userReducer.userInfo.hexId && (
                  <Col>
                    <V7Chip className="vol7er-header__options__menu--option">
                      <Link to="/signin">
                        {t("components.header.menu.signin")}
                      </Link>
                    </V7Chip>
                  </Col>
                )}
                {!!this.props.userReducer.userInfo.hexId && (
                  <Col>
                    <Profile width={35} />
                  </Col>
                )}
                <Col>
                  <Language width={35} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </header>
    );
  }
}

export default connect(state => state)(withTranslation("common")(Header));
