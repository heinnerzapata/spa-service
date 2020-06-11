import React from "react";
import styles from "./v7Footer.module.scss";
import { Row, Col, Grid } from "react-flexbox-grid";
import { V7Logo } from "components";

interface v7FooterProps {}

const V7Footer: React.SFC<v7FooterProps> = (props) => {
  return (
    <footer className={styles.v7Footer}>
      <Grid>
        <Row>
          <Col>
            <V7Logo isScrollTop={false} fontSize={12} />
          </Col>
        </Row>
      </Grid>
    </footer>
  );
};

export default V7Footer;
