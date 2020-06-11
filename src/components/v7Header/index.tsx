import React from "react";
import styles from "./v7Header.module.scss";
import cx from "classnames";
import { Row, Col, Grid } from "react-flexbox-grid";
import { V7Logo, V7Avatar, V7Icon, V7LanguageSelector } from "components";
import { IUserState } from "store/user/reducer";

interface v7HeaderProps {
  userReducer: IUserState;
}

const V7Header: React.SFC<v7HeaderProps> = (props) => {
  return (
    <header className={cx(styles.v7Header, styles.isScroll)}>
      <Grid>
        <Row middle="xs">
          <Col xs={4}>
            <V7Logo isScrollTop={false} fontSize={28} />
          </Col>
          <Col xs={8}>
            <Row end="xs">
              <Col>
                <V7LanguageSelector />
              </Col>
              <Col>
                <V7Avatar
                  alt="Remy Sharp"
                  src={props.userReducer.userInfo.avatar}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </header>
  );
};

export default V7Header;
