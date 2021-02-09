import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { V7Logo } from 'components';
import styles from './v7Footer.module.scss';

interface v7FooterProps {}

const V7Footer: React.FC<v7FooterProps> = () => (
  <div>
    <footer className={styles.v7Footer}>
      <Grid>
        <Row>
          <Col>
            <V7Logo isScrollTop={false} fontSize={12} />
          </Col>
        </Row>
      </Grid>
    </footer>
  </div>
);

export default V7Footer;
