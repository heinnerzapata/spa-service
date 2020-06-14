import React, { useEffect } from "react";
import styles from "./v7Header.module.scss";
import cx from "classnames";
import { Row, Col, Grid } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import { V7Logo, V7Avatar, V7LanguageSelector, V7Chip } from "components";
import { IUserState } from "store/user/reducer";
import { useTranslation } from "react-i18next";

interface v7HeaderProps {
  userReducer: IUserState;
}

const V7Header: React.SFC<v7HeaderProps> = (props) => {
  const { t } = useTranslation();
  const [isScroll, setIsScroll] = React.useState<boolean>(false);

  const validateScrollPosition = () => {
    setIsScroll(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", validateScrollPosition);
    return () => {
      window.removeEventListener("scroll", validateScrollPosition);
    };
  });

  return (
    <header className={cx(styles.v7Header, isScroll ? styles.isScroll : "")}>
      <Grid>
        <Row className={isScroll ? styles.maxHeight : ""} middle="xs">
          <Col xs={4}>
            <V7Logo isScrollTop={false} fontSize={28} />
          </Col>
          <Col xs={8}>
            <Row end="xs">
              {props.userReducer.authenticated && (
                <Col>
                  <V7Chip lighBack>
                    <Link to="/signup">
                      {t("components.header.menu.signup")}
                    </Link>
                  </V7Chip>
                </Col>
              )}
              {props.userReducer.authenticated && (
                <Col>
                  <V7Chip lighBack>
                    <Link to="/signin">
                      {t("components.header.menu.signin")}
                    </Link>
                  </V7Chip>
                </Col>
              )}
              <Col>
                <V7LanguageSelector />
              </Col>
              {props.userReducer.authenticated && (
                <Col>
                  <V7Avatar
                    alt="Remy Sharp"
                    src={props.userReducer.userInfo.avatar}
                  />
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Grid>
    </header>
  );
};

export default V7Header;
