import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import V7Icon from './../../../../../../uiComponents/v7Icon/V7Icon';
import './subscriptionType.scss';
import { COLORS } from './../../../../../../variables/constants/constants';
import { V7Title } from 'uiComponents/components';
import V7Button from '../../../../../../uiComponents/v7Button/V7Button';
import { withTranslation } from 'react-i18next';
import CurrencyFormat from 'react-currency-format';

const SubscriptionType = (props) => {
  const { t } = props;

  const getSubscriptionTypeClases = (isSelected) => {
    let result =  ['vol7er-subscription-type'];
    if (isSelected) {
      result.push('vol7er-subscription-type__is-selected');
    }
    return result.join(' ');
  }

  return (
    <div className={getSubscriptionTypeClases(props.isSelected)}>
      <div className="vol7er-subscription-type__back-cover">
      </div>
      <div className="vol7er-subscription-type__content">
        <Row center="xs" middle="xs">
          <Col>
            <V7Title
              text={t(props.title)}
              size={24}
              bold={true}
              color={COLORS.white} />
          </Col>
          <Col xs={12}>
            <V7Icon
              icon={props.icon}
              size={"4x"} s
              color={COLORS.white} />
          </Col>
          <Col xs={12}>
            <span className="vol7er-subscription-type__price">
              <CurrencyFormat
                value={props.basePrice}
                displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </span>
          </Col>
          <Col xs={12}>
            <V7Button
              className="vol7er-subscription-type__submit"
              text={t('pages.profile.get')}
              type="click"
              onClick={e => props.onClick(e, props.id)}
              disabled={ props.isSelected } />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withTranslation('common')(SubscriptionType);