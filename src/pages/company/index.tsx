import * as Yup from "yup";

import { Col, Row } from "react-flexbox-grid";
import {
  V7Button,
  V7Icon,
  V7PageTitle,
  V7TextField,
} from "components";
import {
  faAt,
  faIndustry,
  faPhone,
  faCity,
  faMapMarkedAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { Formik } from "formik";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { V7PageContainer } from "containers";
import { WithTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface ICompanyProps extends WithTranslation, RouteComponentProps {
  t: any;
  company: any;
  user: any;
  getCompany?: (companyId: string) => any;
  upsertCompany?: (company: any, companyId: string) => any;
}

interface IFormModel {
  email: string;
  display_name: string;
  phone_contact: string;
  city: string;
  address: string;
  contact_name: string;
}

interface ICompanyState {
  initFormValue: IFormModel | null;
  emptyCompany: boolean;
}

class Company extends React.PureComponent<ICompanyProps, ICompanyState> {
  state = {
    initFormValue: {
      email: "",
      display_name: "",
      phone_contact: "",
      city: "",
      address: "",
      contact_name: "",
    },
    emptyCompany: true,
  };

  public getCompanyDetails(prevProps: ICompanyProps) {
    if (
      prevProps.user.companyId !== this.props.user.companyId &&
      this.props.getCompany
    ) {
      this.props.getCompany(this.props.user.companyId);
    }
  }

  public validateCompanyDetails(prevProps: ICompanyProps) {
    if (prevProps?.company?.company !== this.props?.company?.company) {
      this.setCompanyInitValues();
    }
  }

  public submit(model: IFormModel) {
    const { upsertCompany, t } = this.props;
    const hex_id = this.props?.company?.company?.hex_id;
    this.setState({ emptyCompany: true });
    if (upsertCompany) {
      upsertCompany(model, hex_id)
        .then((data: any) => {
          this.setState({ emptyCompany: !data.company });
          toast.success(`${t("toast.companySaved")}!!`);
        })
        .catch((err: any) => {
          toast.success(`${t("toast.errorCompanySaved")}!!`);
        });
    }
  }

  public setCompanyInitValues = () => {
    const {
      address,
      city,
      contact_name,
      display_name,
      email,
      phone_contact,
    } = this.props?.company?.company;
    this.setState({
      initFormValue: {
        email,
        display_name,
        phone_contact,
        city,
        address,
        contact_name,
      },
      emptyCompany: false,
    });
  };

  public componentDidMount() {
    if (this.props.company.company) {
      this.setCompanyInitValues();
    }
  }

  public componentDidUpdate(prevProps: ICompanyProps) {
    if (this.state.emptyCompany) {
      this.getCompanyDetails(prevProps);
      this.validateCompanyDetails(prevProps);
    }
  }

  render() {
    const { t } = this.props;

    const validationsForm = Yup.object().shape({
      email: Yup.string()
        .email(t("errors.forms.notValidEmail"))
        .required(t("errors.forms.required")),
      display_name: Yup.string()
        .min(3, t("errors.forms.notValidDisplayName"))
        .required(t("errors.forms.required")),
      phone_contact: Yup.string()
        .required(t("errors.forms.required"))
        .min(10, t("errors.forms.notValidPhoneContact")),
      city: Yup.string().required(t("errors.forms.required")),
      address: Yup.string().required(t("errors.forms.required")),
      contact_name: Yup.string().required(t("errors.forms.required")),
    });

    const getTextError = (
      touched: boolean | undefined,
      error: string | undefined
    ): string => {
      return error !== undefined && touched && error !== undefined ? error : "";
    };

    const onSubmit = async (model: IFormModel, resetForm: any) => {
      this.submit(model);
    };

    return (
      <section>
        <V7PageTitle title={t("pages.company.title")} />
        <V7PageContainer
          noFluid
          page="profile"
          marginTop={70}
          showPreloader={
            this.props?.user?.isFettching || this.props?.company?.isFettching
          }
          isFull
          isProtected
        >
          <Formik
            initialValues={this.state.initFormValue}
            enableReinitialize={true}
            validateOnChange={true}
            validateOnBlur={true}
            validationSchema={validationsForm}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              onSubmit(values, resetForm);
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
              <form onSubmit={handleSubmit} autoComplete="off">
                <Row center="xs">
                  <Col xs={12} lg={6}>
                    <V7TextField
                      id={"email"}
                      name={"email"}
                      type={"text"}
                      label={t("labels.forms.email")}
                      disabled={isSubmitting}
                      error={errors.email !== undefined && touched.email}
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faAt} size={"2x"} />}
                      errorText={getTextError(touched.email, errors.email)}
                    />
                  </Col>
                  <Col xs={12} lg={6}>
                    <V7TextField
                      id={"display_name"}
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
                      icon={<V7Icon icon={faIndustry} size={"2x"} />}
                      errorText={getTextError(
                        touched.display_name,
                        errors.display_name
                      )}
                    />
                  </Col>
                  <Col xs={12} lg={6}>
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
                  <Col xs={12} lg={6}>
                    <V7TextField
                      id={"city"}
                      name={"city"}
                      type={"text"}
                      label={t("labels.forms.city")}
                      disabled={isSubmitting}
                      error={errors.city !== undefined && touched.city}
                      value={values.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faCity} size={"2x"} />}
                      errorText={getTextError(touched.city, errors.city)}
                    />
                  </Col>
                  <Col xs={12} lg={6}>
                    <V7TextField
                      id={"address"}
                      name={"address"}
                      type={"text"}
                      label={t("labels.forms.address")}
                      disabled={isSubmitting}
                      error={errors.address !== undefined && touched.address}
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faMapMarkedAlt} size={"2x"} />}
                      errorText={getTextError(touched.address, errors.address)}
                    />
                  </Col>
                  <Col xs={12} lg={6}>
                    <V7TextField
                      id={"contact_name"}
                      name={"contact_name"}
                      type={"text"}
                      label={t("labels.forms.contactName")}
                      disabled={isSubmitting}
                      error={
                        errors.contact_name !== undefined &&
                        touched.contact_name
                      }
                      value={values.contact_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      icon={<V7Icon icon={faUser} size={"2x"} />}
                      errorText={getTextError(
                        touched.contact_name,
                        errors.contact_name
                      )}
                    />
                  </Col>
                </Row>
                <Row center="xs">
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
        </V7PageContainer>
      </section>
    );
  }
}

export default Company;
