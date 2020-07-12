import React from "react";
import { WithTranslation } from "react-i18next";
import {
  V7PageTitle,
  V7TextField,
  V7Input,
  V7Icon,
  V7Button,
  V7Link,
} from "components";
import { V7PageContainer } from "containers";
import { Row, Col } from "react-flexbox-grid";
import Formsy from "formsy-react";
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import { setToken } from "utilities/token";
import { RouteComponentProps } from "react-router-dom";
import _ from "lodash";
import { ICredentials } from "models";
import { IUserState } from "store/user/reducer";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";

interface IRecoverProps extends WithTranslation, RouteComponentProps {
  t: any;
}

interface IRecoverState {}

interface IFormModel {
  email: string;
}

const initFormValue: IFormModel = {
  email: "",
};

class Recover extends React.PureComponent<IRecoverProps, IRecoverState> {
  constructor(props: IRecoverProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { t } = this.props;

    const validationsForm = Yup.object().shape({
      email: Yup.string()
        .email(t("errors.forms.notValidEmail"))
        .required(t("errors.forms.required")),
    });

    return (
      <section>
        <V7PageTitle title={t("pages.recover.title")} />
        <V7PageContainer page="recover" marginTop={150} isFull>
          <Formik
            initialValues={initFormValue}
            validationSchema={validationsForm}
            onSubmit={(values, { setSubmitting }) => {}}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Row center="xs">
                  <Col xs={12} md={6} xl={4}>
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
                      errorText={
                        errors.email !== undefined && touched.email
                          ? errors.email
                          : ""
                      }
                    />
                  </Col>
                </Row>
                <Row center="xs">
                  <Col xs={12} md={6} xl={4}>
                    <V7Button
                      type="submit"
                      disabled={
                        Object.keys(errors).length !== 0 ||
                        Object.keys(touched).length === 0 ||
                        isSubmitting
                      }
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

export default Recover;
