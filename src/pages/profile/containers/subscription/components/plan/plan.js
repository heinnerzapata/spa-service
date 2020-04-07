import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { V7Switch } from 'uiComponents/components';
import { translate } from 'react-i18next';
import faFlask from "@fortawesome/fontawesome-free-solid/faFlask";
import faLightbulb from "@fortawesome/fontawesome-free-solid/faLightbulb";
import SubscriptionType from './../subscriptionType/subscriptionType';

const Plan = (props) => {
  const { t } = props;

  const getPaymentTypeOption = (index, props) => {
    const result = props.paymentTypeOptios.length >= 2 ?
      props.paymentTypeOptios[index].name.toLowerCase() : '';
    return `pages.profile.subscriptionTypes.${result}`;
  }

  const getSubscriptionList = (props) => {
    return props.subscriptionTypes.map((object, i) => {
      const { t } = props;
      const isSelected = props.subscriptionTypeSelected === object.id;
      return (
        <Col
          key={i}
          xs={12}
          md={6}
          lg={3}>
          <SubscriptionType
            id={object.id}
            icon={object.basePrice === 0 ? faFlask : faLightbulb}
            title={t(`pages.profile.subscriptionTypes.${object.name.toLowerCase()}`)}
            basePrice={object.basePrice}
            onClick={props.onClick}
            isSelected={ isSelected } />
        </Col>
      )
    });
  }

  return (
    <div style={props.style}>
      <Row>
        <Col xs={12}>
          <V7Switch onChange={props.onChange}
            checked={props.paymentTypeSelected}
            optLeft={t(getPaymentTypeOption(0, props))}
            optRight={t(getPaymentTypeOption(1, props))} />
        </Col>
      </Row>
      <Row>
        {getSubscriptionList(props)}
      </Row>
    </div>
  )
}

export default translate('common')(Plan);