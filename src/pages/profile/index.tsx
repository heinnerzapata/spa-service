import * as Yup from "yup";

import { Col, Row } from "react-flexbox-grid";
import {
  V7Button,
  V7Icon,
  V7Image,
  V7PageTitle,
  V7TextField,
} from "components";
import { faAt, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

import { Formik } from "formik";
import { IUserState } from "store/user/reducer";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { V7PageContainer } from "containers";
import { WithTranslation } from "react-i18next";
import styles from "./profile.module.scss";
import { toast } from "react-toastify";

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
  state = {
    initFormValue: {
      email: "",
      display_name: "",
      first_name: "",
      last_name: "",
      phone_contact: "",
    },
  };

  componentDidUpdate(prevProps: IProfileProps) {
    if (
      prevProps.userReducer !== this.props.userReducer &&
      this.props.userReducer.userInfo !== null
    ) {
      const userInfo = this.props.userReducer.userInfo;
      if (this.state.initFormValue.email === "") {
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
        .catch((err: any) => {
          toast.error(`${t("toast.errorInProcess")}`);
          this.props.history.push(`/`);
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
        }
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
      error: string | undefined
    ): string => {
      return error !== undefined && touched && error !== undefined ? error : "";
    };
    const validationsForm = Yup.object().shape({
      first_name: Yup.string()
        .min(3, t("errors.forms.notValidFirstName"))
        .required(t("errors.forms.required")),
      last_name: Yup.string()
        .min(3, t("errors.forms.notValidLastName"))
        .required(t("errors.forms.required")),
      display_name: Yup.string()
        .required(t("errors.forms.required"))
        .min(3, t("errors.forms.notValidDisplayName")),
      email: Yup.string()
        .email(t("errors.forms.notValidEmail"))
        .required(t("errors.forms.required")),
      phone_contact: Yup.string()
        .required(t("errors.forms.required"))
        .min(10, t("errors.forms.notValidPhoneContact")),
    });
    return (
      <section>
        <V7PageTitle title={t("pages.profile.title")} />
        <V7PageContainer
          noFluid
          page="profile"
          marginTop={70}
          showPreloader={this.props.userReducer.isFetching}
          isFull
          isProtected
        >
          <Row center="xs">
            <Col xs={12} sm={12} md={6} lg={4}>
              <V7Image
                className={styles.image}
                noShadow={false}
                type="round"
                flip
                src={this.props.userReducer?.userInfo?.avatar}
                width={300}
                height={300}
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={8}>
              <Formik
                initialValues={this.state.initFormValue}
                validateOnChange={true}
                validateOnBlur={true}
                validationSchema={validationsForm}
                onSubmit={(
                  values: IFormModel,
                  { setSubmitting, resetForm }
                ) => {
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
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} xl={6}>
                        <V7TextField
                          id={"first_name"}
                          name={"first_name"}
                          type={"text"}
                          label={t("labels.forms.firstName")}
                          disabled={isSubmitting}
                          error={
                            errors.first_name !== undefined &&
                            touched.first_name
                          }
                          value={values.first_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          icon={<V7Icon icon={faUser} size={"2x"} />}
                          errorText={getTextError(
                            touched.first_name,
                            errors.first_name
                          )}
                        />
                      </Col>
                      <Col xs={12} xl={6}>
                        <V7TextField
                          id={"last_name"}
                          name={"last_name"}
                          type={"text"}
                          label={t("labels.forms.lastName")}
                          disabled={isSubmitting}
                          error={
                            errors.last_name !== undefined && touched.last_name
                          }
                          value={values.last_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          icon={<V7Icon icon={faUser} size={"2x"} />}
                          errorText={getTextError(
                            touched.last_name,
                            errors.last_name
                          )}
                        />
                      </Col>
                      <Col xs={12} xl={6}>
                        <V7TextField
                          id={"last_name"}
                          name={"display_name"}
                          type={"text"}
                          label={t("labels.forms.displayName")}
                          disabled={isSubmitting}
                          error={
                            errors.display_name !== undefined &&
                            touched.display_name
                          }
                          value={values.display_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          icon={<V7Icon icon={faUser} size={"2x"} />}
                          errorText={getTextError(
                            touched.display_name,
                            errors.display_name
                          )}
                        />
                      </Col>
                      <Col xs={12} xl={6}>
                        <V7TextField
                          id={"email"}
                          name={"email"}
                          type={"text"}
                          label={t("labels.forms.email")}
                          disabled={true}
                          error={errors.email !== undefined && touched.email}
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          icon={<V7Icon icon={faAt} size={"2x"} />}
                          errorText={getTextError(touched.email, errors.email)}
                        />
                      </Col>
                      <Col xs={12} xl={6}>
                        <V7TextField
                          id={"phone_contact"}
                          name={"phone_contact"}
                          type={"number"}
                          label={t("labels.forms.phoneContact")}
                          disabled={isSubmitting}
                          error={
                            errors.phone_contact !== undefined &&
                            touched.phone_contact
                          }
                          value={values.phone_contact}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          icon={<V7Icon icon={faPhone} size={"2x"} />}
                          errorText={getTextError(
                            touched.phone_contact,
                            errors.phone_contact
                          )}
                        />
                      </Col>
                      <Col xs={12}>
                        <V7Button
                          type="submit"
                          disabled={!(isValid && dirty)}
                          size="large"
                        >
                          {t("labels.forms.submit")}
                        </V7Button>
                      </Col>
                    </Row>
                  </form>
                )}
              </Formik>
            </Col>
          </Row>
        </V7PageContainer>
      </section>
    );
  }
}

export default Profile;
