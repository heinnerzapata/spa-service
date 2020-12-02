import React, { useEffect } from "react";
import styles from "./v7Header.module.scss";
import cx from "classnames";
import { Row, Col, Grid } from "react-flexbox-grid";
import {
  faSignOutAlt,
  faUser,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { COLORS } from "variables/constants";
import {
  V7Logo,
  V7LanguageSelector,
  V7Button,
  V7Link,
  V7Menu,
  V7Icon,
} from "components";
import { IUserState } from "store/user/reducer";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

interface v7HeaderProps {
  userReducer: IUserState;
  onLogOut?: () => void;
}

const V7Header: React.SFC<v7HeaderProps> = (props) => {
  const { t } = useTranslation();
  const [isScroll, setIsScroll] = React.useState<boolean>(false);
  const history = useHistory();

  const validateScrollPosition = () => {
    setIsScroll(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", validateScrollPosition);
    return () => {
      window.removeEventListener("scroll", validateScrollPosition);
    };
  });

  const handleMenuUserClick = (index: number) => {
    switch (index) {
      case 0:
        history.push("/profile");
        break;
      case 1:
        history.push("/company");
        break;
      case 2:
        if (props.onLogOut) {
          props.onLogOut();
        }
        break;
    }
  };

  return (
    <header className={cx(styles.v7Header, isScroll ? styles.isScroll : "")}>
      <Grid>
        <Row className={isScroll ? styles.maxHeight : ""} middle="xs">
          <Col xs={4}>
            <Link to="/">
              <V7Logo isScrollTop={false} fontSize={28} />
            </Link>
          </Col>
          <Col xs={8}>
            <Row end="xs">
              {!props.userReducer.isFetching && (
                <React.Fragment>
                  {props.userReducer.authenticated && (
                    <V7Link to={"/dashboard"} color={COLORS.white} size={12}>
                      <V7Button type="submit" visualType="outlined">
                        {t("components.header.menu.dashboard")}
                      </V7Button>
                    </V7Link>
                  )}
                  {!props.userReducer.authenticated && (
                    <V7Link to={"/signup"} color={COLORS.white} size={12}>
                      <V7Button type="submit" visualType="outlined">
                        {t("components.header.menu.signup")}
                      </V7Button>
                    </V7Link>
                  )}
                  {!props.userReducer.authenticated && (
                    <V7Link to={"/signin"} color={COLORS.white} size={12}>
                      <V7Button type="submit" visualType="outlined">
                        {t("components.header.menu.signin")}
                      </V7Button>
                    </V7Link>
                  )}
                  {props.userReducer.authenticated &&
                    props.userReducer.userInfo && (
                      <V7Menu
                        width={140}
                        onItemClick={handleMenuUserClick}
                        menuImage={props.userReducer.userInfo.avatar}
                        listItems={[
                          <React.Fragment>
                            <div className={styles.menuItemContainer}>
                              <V7Icon icon={faUser} size={"1x"} />
                              <span className={styles.menuItemText}>
                                {" "}
                                {t(`components.header.menu.profile`)}
                              </span>
                            </div>
                          </React.Fragment>,
                          <React.Fragment>
                            <div className={styles.menuItemContainer}>
                              <V7Icon icon={faIndustry} size={"1x"} />
                              <span className={styles.menuItemText}>
                                {" "}
                                {t(`components.header.menu.company`)}
                              </span>
                            </div>
                          </React.Fragment>,
                          <React.Fragment>
                            <div className={styles.menuItemContainer}>
                              <V7Icon icon={faSignOutAlt} size={"1x"} />
                              <span className={styles.menuItemText}>
                                {" "}
                                {t(`components.header.menu.closeSession`)}
                              </span>
                            </div>
                          </React.Fragment>,
                        ]}
                      />
                    )}
                </React.Fragment>
              )}
              <Col>
                <V7LanguageSelector />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </header>
  );
};

export default V7Header;
