/* eslint-disable max-len */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import * as Yup from 'yup';

import { Formik } from 'formik';
import { IUserState } from 'store/user/reducer';
import { RouteComponentProps } from 'react-router-dom';
import { WithTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface IProfileProps extends WithTranslation, RouteComponentProps {
  t: any;
  userReducer: IUserState;
  updateUser?: (newUserInfo: any, hexId: string) => any;
}

interface IProfileState {
  initFormValue: IFormModel;
}

interface IFormModel {
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  phone_contact: string;
}

class Profile extends React.PureComponent<IProfileProps, IProfileState> {
  constructor(props: IProfileProps) {
    super(props);

    this.state = {
      initFormValue: {
        email: '',
        display_name: '',
        first_name: '',
        last_name: '',
        phone_contact: '',
      },
    };
  }

  componentDidUpdate(prevProps: IProfileProps) {
    if (
      prevProps.userReducer !== this.props.userReducer
      && this.props.userReducer.userInfo !== null
    ) {
      const { userInfo } = this.props.userReducer;
      if (this.state.initFormValue.email === '') {
        this.setState({
          initFormValue: {
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            display_name: userInfo.display_name,
            email: userInfo.email,
            phone_contact: userInfo.phone_contact,
          },
        });
      }
    }
  }

  submit(model: IFormModel, resetForm: any) {
    const { t } = this.props;
    if (this.props.updateUser) {
      this.props
        .updateUser(model, this.props.userReducer.userInfo.hex_id)
        .catch(() => {
          toast.error(`${t('toast.errorInProcess')}`);
          this.props.history.push('/');
        });

      this.setState(
        {
          initFormValue: {
            first_name: model.first_name,
            last_name: model.last_name,
            display_name: model.display_name,
            email: model.email,
            phone_contact: model.phone_contact,
          },
        },
        () => {
          resetForm({ values: this.state.initFormValue });
        },
      );
    }
  }

  onSubmit = async (model: IFormModel, resetForm: any) => {
    this.submit(model, resetForm);
  };

  render() {
    const { t } = this.props;

    const getTextError = (
      touched: boolean | undefined,
      error: string | undefined,
    ): string => (error !== undefined && touched && error !== undefined ? error : '');

    const showError = (info: any) => (
      <span className="error">
        *
        {info}
        <br />
      </span>
    );

    const validationsForm = Yup.object().shape({
      first_name: Yup.string()
        .min(3, t('errors.forms.notValidFirstName'))
        .required(t('errors.forms.required')),
      last_name: Yup.string()
        .min(3, t('errors.forms.notValidLastName'))
        .required(t('errors.forms.required')),
      display_name: Yup.string()
        .required(t('errors.forms.required'))
        .min(3, t('errors.forms.notValidDisplayName')),
      email: Yup.string()
        .email(t('errors.forms.notValidEmail'))
        .required(t('errors.forms.required')),
      phone_contact: Yup.string()
        .required(t('errors.forms.required'))
        .min(10, t('errors.forms.notValidPhoneContact')),
    });

    return (
      <div>
        <Row>
          <Col xs="12" md="12" lg="4">
            <Card>
              <CardBody>
                <div className="text-center mt-4">
                  <img
                    src={this.props.userReducer?.userInfo?.avatar}
                    className="rounded-circle"
                    width="150"
                    alt=""
                  />
                  <CardTitle className="mt-2">
                    {this.props.userReducer?.userInfo?.display_name}
                  </CardTitle>
                  <CardSubtitle>
                    Account Manager
                  </CardSubtitle>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="12" lg="8" sm="12">
            <Card>
              <CardBody>
                <Formik
                  initialValues={this.state.initFormValue}
                  validateOnChange
                  validateOnBlur
                  validationSchema={validationsForm}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    this.onSubmit(values, resetForm);
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                    dirty,
                  }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                      <FormGroup>
                        <Label>
                          {t('labels.forms.displayName')}
                        </Label>
                        <Input
                          disabled={isSubmitting}
                          id="display_name"
                          name="display_name"
                          type="text"
                          defaultValue={this.state.initFormValue.display_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={t('labels.forms.displayName')}
                        />
                        {
                          getTextError(touched.display_name, errors.display_name)
                            && showError(getTextError(touched.display_name, errors.display_name))
                            && touched.display_name
                        }
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          {t('labels.forms.email')}
                        </Label>
                        <Input
                          disabled={isSubmitting}
                          id="email"
                          name="email"
                          type="email"
                          defaultValue={this.state.initFormValue.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={t('labels.forms.email')}
                        />
                        {
                          getTextError(touched.email, errors.email)
                            && showError(getTextError(touched.email, errors.email))
                            && touched.email
                        }
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          {t('labels.forms.phoneContact')}
                        </Label>
                        <Input
                          disabled={isSubmitting}
                          id="phone_contact"
                          name="phone_contact"
                          type="text"
                          defaultValue={this.state.initFormValue.phone_contact}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={t('labels.forms.phoneContact')}
                        />
                        {
                          getTextError(touched.email, errors.email)
                            && showError(getTextError(touched.email, errors.email))
                            && touched.email
                        }
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          {t('labels.forms.password')}
                        </Label>
                        <Input
                          disabled={isSubmitting}
                          type="password"
                          id="password"
                          name="password"
                          defaultValue={this.state.initFormValue.phone_contact}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={t('labels.forms.password')}
                        />
                      </FormGroup>
                      <Button
                        disabled={!(isValid && dirty && values)}
                        color="primary"
                        style={{
                          backgroundColor: '#44a0ff',
                          borderColor: '#44a0ff',
                        }}
                      >
                        {t('labels.forms.updateProfile')}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
