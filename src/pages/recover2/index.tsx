import React from "react";
import { WithTranslation } from "react-i18next";
import { V7PageTitle, V7TextField, V7Button, V7Icon } from "components";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { V7PageContainer } from "containers";
import { Row, Col } from "react-flexbox-grid";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { IUserState } from "store/user/reducer";
import * as Yup from "yup";
import FormEmail from "./formEmail";
import FormPassword from "./formPassword";

interface IRecoverProps extends WithTranslation, RouteComponentProps {
  t: any;
  userReducer: IUserState;
  onRecoverPassword: (email: string) => void;
}

interface IRecoverState {}

class Recover extends React.PureComponent<IRecoverProps, IRecoverState> {
  render() {
    const { t } = this.props;
    return (
      <section>
        <V7PageTitle title={t("pages.recover.title")} />
        <V7PageContainer
          page="recover"
          marginTop={150}
          showPreloader={this.props.userReducer.isFetching}
          isFull
        >
          <FormEmail onRecoverPassword={this.props.onRecoverPassword} t={t} />
          <FormPassword
            onRecoverPassword={this.props.onRecoverPassword}
            t={t}
          />
        </V7PageContainer>
      </section>
    );
  }
}

export default Recover;
