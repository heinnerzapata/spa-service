import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'react-flexbox-grid';
import { V7TextField, V7Button, V7Icon } from 'components';
import { faAt } from '@fortawesome/free-solid-svg-icons';

interface IFormPassword {
  t: any;
  history: any;
  onFormEmailSubmit: (password: string) => void;
}

interface IFormModel {
  password: string;
  passwordConfirm: string;
}

const initFormValue: IFormModel = {
  password: '',
  passwordConfirm: '',
};

const FormPassword: React.SFC<IFormPassword> = (props) => {
  const { t } = props;

  const validationsForm = Yup.object().shape({
    password: Yup.string().required(t('errors.forms.required')),
    passwordConfirm: Yup.string()
      .min(8, t('errors.forms.notValidPassword'))
      .required(t('errors.forms.required'))
      .oneOf([Yup.ref('password'), ''], t('errors.forms.confirmNewPassword')),
  });

  const onSubmit = async (password: string, resetForm: any) => {
    props.onFormEmailSubmit(password);
    resetForm({});
  };

  return (
    <Formik
      initialValues={initFormValue}
      validateOnChange
      validateOnBlur
      validationSchema={validationsForm}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values.password, resetForm);
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
            <Col xs={12} md={6} xl={4}>
              <V7TextField
                id="password"
                name="password"
                type="password"
                label={t('labels.forms.newPassword')}
                disabled={isSubmitting}
                error={errors.password !== undefined && touched.password}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                icon={<V7Icon icon={faAt} size="2x" />}
                errorText={
                  errors.password !== undefined && touched.password
                    ? errors.password
                    : ''
                }
              />
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12} md={6} xl={4}>
              <V7TextField
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                label={t('labels.forms.passwordConf')}
                disabled={isSubmitting}
                error={
                  errors.passwordConfirm !== undefined
                  && touched.passwordConfirm
                }
                value={values.passwordConfirm}
                onBlur={handleBlur}
                onChange={handleChange}
                icon={<V7Icon icon={faAt} size="2x" />}
                errorText={
                  errors.passwordConfirm !== undefined
                  && touched.passwordConfirm
                    ? errors.passwordConfirm
                    : ''
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
                {t('labels.forms.submit')}
              </V7Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default FormPassword;
