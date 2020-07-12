import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { V7Padding, V7StepButtons, V7Title } from 'uiComponents/components';
import Formsy from 'formsy-react';
import V7Icon from "./../../../../../../uiComponents/v7Icon/V7Icon";
import { V7Input } from "uiComponents/components";
import { faIndustry, faAt } from "@fortawesome/free-solid-svg-icons";
import V7Preloader from "./../../../../../../uiComponents/v7Preloader/V7Preloader";

const CompanyDetails = (props) => {
  const { t } = props;
  const paddingStyle = {
    left: 0,
    right: 0,
    top: 20,
    bottom: 20
  };
  return (
    <div style={props.style}>
      {!props.isBasicDetailsLoading ?
        <Formsy
          onValidSubmit={props.onSubmitBasicDetails}
          onValid={props.onEnableSubmitBasicDetails}
          onInvalid={props.onDisableSubmitBasicDetails}>
          <V7Padding padding={paddingStyle}>
            <Grid>
              <Row middle="xs" center="xs">
                <Col xs={12}>
                  <V7Title
                    text={t('pages.profile.subscriptionTypes.companyDetails')}
                    size={24}
                    bold={true}
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={12} md={10} lg={6}>
                  <Row middle="xs">
                    <Col xs={12}>
                      <V7Input
                        name="companyName"
                        s={12}
                        validations="minLength:3"
                        type="text"
                        validationError={t('errors.forms.notValidCompanyName')}
                        label={t('labels.forms.companyName')}
                        defaultValue={props.initCompanyDetails.displayName}
                        icon={
                          <V7Icon
                            icon={faIndustry}
                            size={"2x"} />
                        }
                        required />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={12} md={10} lg={6}>
                  <Row middle="xs">
                    <Col xs={12}>
                      <V7Input
                        name="email"
                        s={12}
                        validations="isExisty,isEmail"
                        type="text"
                        validationError={t('errors.forms.notValidEmail')}
                        label={t('labels.forms.email')}
                        defaultValue={props.initCompanyDetails.email}
                        icon={
                          <V7Icon
                            icon={faAt}
                            size={"2x"} />
                        }
                        required />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </V7Padding>
          <V7StepButtons
            firstText={t('labels.forms.return')}
            onClickFirst={props.onClickPrevStep}
            firstType='click'
            disabledFirst={false}
            disabledSecond={!props.isDisabledSubmitBasicDetails}
            secondText={t('labels.forms.save')}
            secondType='submit'>
          </V7StepButtons>
        </Formsy>
        :
        <V7Preloader />
      }
    </div>
  )
}

export default withTranslation('common')(CompanyDetails);