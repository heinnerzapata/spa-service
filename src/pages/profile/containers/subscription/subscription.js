import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import UserService from './../../../../services/user.service';
import CompanyService from "../../../../services/company.service";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { V7Stepper } from 'uiComponents/components';
import { SUBSCRIPTION_STEPS } from './subscription.constants';
import CompanyDetails from './components/companyDetails/companyDetails';
import Payment from './components/payment/payment';
import V7Preloader from "../../../../uiComponents/v7Preloader/V7Preloader";
import { withRouter } from 'react-router-dom';
import Plan from './components/plan/plan';
import _ from 'lodash';

class Subscription extends Component {
  state = {
    subscriptionTypes: [],
    paymentMethods: [],
    paymentTypeSelected: true,
    subscriptionTypeSelected: 1,
    paymentTypeOptios: [],
    currentStep: 0,
    isSubmitBasicDetailsEnabled: false,
    isBasicDetailsLoading: false,
    isLoading: false,
    initCompanyDetails: {
      displayName: '',
      mail: '',
      paymentTypeId: null,
      subscriptionTypeId: null
    },
  };
  constructor(props) {
    super(props);
    this.userService = UserService;
    this.companyService = CompanyService;
  }

  getSteps = () => {
    const { t } = this.props;
    return SUBSCRIPTION_STEPS.map(step => {
      return {
        title: t(`pages.profile.subscriptionTypes.${step.title}`)
      }
    });
  }

  getSubscriptionTypes = () => {
    this.userService.getSubscriptionTypes()
      .then(result => {
        this.validateSubscriptiontypes(result);
      })
      .catch(error => {
      });
  }

  validateSubscriptiontypes(subscriptiontypes) {
    this.setState({
      subscriptionTypes: subscriptiontypes.subscriptionTypes,
      paymentMethods: subscriptiontypes.paymentMethods,
      paymentTypeOptios: subscriptiontypes.paymentTypes
    });

    this.validateUserCompany();
  }

  validateUserCompany() {
    const companyId = this.props.userReducer.userInfo.company;
    if (companyId) {
      this.getCompanyDetails(companyId);
    } else {
      this.setState({ isLoading: false });
    }
  }

  onClick = (e, id) => {
    let newValue = _.find(this.state.subscriptionTypes, type => type.id === id).id;
    this.setState({
      subscriptionTypeSelected: newValue
    }, () => {
      this.setState({ currentStep: this.state.currentStep + 1 });
    })
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getSubscriptionTypes();
  }

  getCompanyDetails = (companyId) => {
    this.companyService.getCompany(companyId)
      .then(result => {
        this.populateCompanyDetails(result.company);
        this.setState({ isLoading: false });
      })
      .catch(error => {
      });
  }

  populateCompanyDetails = (companyDetails) => {
    console.log(companyDetails.subscriptionTypeId);
    this.setState({
      initCompanyDetails: companyDetails,
      paymentTypeSelected: companyDetails.paymentTypeId === 1,
      subscriptionTypeSelected: companyDetails.subscriptionTypeId
    }, () => {
      this.setState({ isLoading: false });
    });
  }

  onChange = (checked) => {
    this.setState({ paymentTypeSelected: checked });
  }

  onSubmitBasicDetails = (model) => {
    this.setState({ isBasicDetailsLoading: true });
    this.companyService.createCompany({
      email: model.email,
      displayName: model.companyName,
      accountHexId: this.props.userReducer.userInfo.hexId
    })
      .then(result => {
        this.setState({ isBasicDetailsLoading: false });
        this.onClickNextStep();
      })
      .catch(error => {
        this.setState({ isBasicDetailsLoading: false });
        this.onClickNextStep();
      });
  }

  onEnableSubmitBasicDetails = () => {
    this.setState({ isSubmitBasicDetailsEnabled: true });
  }

  onDisableSubmitBasicDetails = () => {
    this.setState({ isSubmitBasicDetailsEnabled: false });
  }

  onClickPrevStep = (e) => {
    this.setState({ currentStep: this.state.currentStep - 1 });
  }

  onClickPay = (e) => {
    this.props.history.push('dashboard');
  }

  onClickNextStep = (e) => {
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  render() {
    const displayNone = { display: 'none' };
    const displayBlock = { display: 'block' };
    return (
      <section>
        {!this.state.isLoading ?
          <Grid>
            <Row>
              <Col xs={12}>
                <V7Stepper
                  steps={this.getSteps()}
                  activeStep={this.state.currentStep}>
                </V7Stepper>
              </Col>
            </Row>
            <Plan
              style={this.state.currentStep === 0 ? displayBlock : displayNone}
              paymentTypeOptios={this.state.paymentTypeOptios}
              paymentTypeSelected={this.state.paymentTypeSelected}
              subscriptionTypeSelected={this.state.subscriptionTypeSelected}
              subscriptionTypes={this.state.subscriptionTypes}
              onClick={this.onClick}
              onChange={this.onChange}>
            </Plan>
            <CompanyDetails
              style={this.state.currentStep === 1 ? displayBlock : displayNone}
              onClickPrevStep={this.onClickPrevStep}
              onSubmitBasicDetails={this.onSubmitBasicDetails}
              onEnableSubmitBasicDetails={this.onEnableSubmitBasicDetails}
              onDisableSubmitBasicDetails={this.onDisableSubmitBasicDetails}
              isDisabledSubmitBasicDetails={this.state.isSubmitBasicDetailsEnabled}
              isBasicDetailsLoading={this.state.isBasicDetailsLoading}
              initCompanyDetails={this.state.initCompanyDetails}>
            </CompanyDetails>
            <Payment
              style={this.state.currentStep === 2 ? displayBlock : displayNone}
              onClickPrevStep={this.onClickPrevStep}
              onClickPay={this.onClickPay}>
            </Payment>
          </Grid>
          :
          <V7Preloader />}
      </section>
    );
  }
}

export default connect(state => state)(withTranslation('common')(withRouter(Subscription)));