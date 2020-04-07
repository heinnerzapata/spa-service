import React from 'react';
import { V7StepButtons, V7Title } from 'uiComponents/components';
import { translate } from 'react-i18next';
import { Row, Col, Grid } from 'react-flexbox-grid';

const Payment = (props) => {
  const { t } = props;
  return (
    <div style={props.style}>
      <Grid>
        <Row middle="xs" center="xs">
          <Col xs={12}>
            <V7Title
              text={t('labels.forms.pay')}
              size={24}
              bold={true}
            />
          </Col>
        </Row>
        <V7StepButtons
          firstText={t('labels.forms.return')}
          onClickFirst={props.onClickPrevStep}
          onClickSecond={props.onClickPay}
          firstType='click'
          disabledFirst={false}
          disabledSecond={false}
          secondText={t('labels.forms.pay')}
          secondType='click'>
        </V7StepButtons>
      </Grid>
    </div>
  )
}

export default translate('common')(Payment);
