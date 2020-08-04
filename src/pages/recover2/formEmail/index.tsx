import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-flexbox-grid";
import { V7TextField, V7Button, V7Icon } from "components";
import { faAt } from "@fortawesome/free-solid-svg-icons";

interface IFormEmail {
  t: any;
  onFormEmailSubmit: (email: string) => void;
}

interface IFormModel {
  email: string;
}

const initFormValue: IFormModel = {
  email: "",
};

const FormEmail: React.SFC<IFormEmail> = (props) => {
  const { t } = props;

  const validationsForm = Yup.object().shape({
    email: Yup.string()
      .email(t("errors.forms.notValidEmail"))
      .required(t("errors.forms.required")),
  });

  const onSubmit = async (email: string, resetForm: any) => {
    props.onFormEmailSubmit(email);
    resetForm({});
  };

  return (
    <Formik
      initialValues={initFormValue}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={validationsForm}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values.email, resetForm);
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
                icon={<V7Icon icon={faAt} size={"2x"} />}
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
  );
};

export default FormEmail;
