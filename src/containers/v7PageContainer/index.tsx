import React from "react";
import styles from "./v7PageContainer.module.scss";
import { Grid } from "react-flexbox-grid";
import { createUseStyles } from "react-jss";
import { V7Preloader } from "components";
import { IUserState } from "store/user/reducer";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "store";
import { connect } from "react-redux";
import { loginFromToken } from "store/user/actions";
import { getToken } from "utilities/token";
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router-dom";
import _ from "lodash";

interface IPageContainerProps extends RouteComponentProps {
  isFull?: boolean;
  isMarginTopActivated?: boolean;
  showTools?: boolean;
  marginTop?: number;
  marginBotton?: number;
  showPreloader?: boolean;
  isProtected?: boolean;
  children: any;
  userReducer: IUserState;
  page: string;
  onLoginFromToken?: (token: string) => any;
}

const PAGES_REDIRECT_ON_LOGGED = ["/signin", "/signup", "/recover"];

const useStyles = createUseStyles({
  v7PageContainer: {
    paddingTop: (props: IPageContainerProps) =>
      `${props.marginTop ? props.marginTop : 20}px`,
    marginBotton: (props: IPageContainerProps) =>
      `${props.marginBotton ? props.marginTop : 20}px`,
  },
});

interface IChildrenWrapper {
  marginTop?: number;
}

const ChildrenWrapper: React.SFC<IChildrenWrapper> = (props) => {
  const classes = useStyles(props);
  return <div className={classes.v7PageContainer}>{props.children}</div>;
};

interface IPageContainerState {
  isLoading: boolean;
}

class V7PageContainer extends React.PureComponent<
  IPageContainerProps,
  IPageContainerState
> {
  state = {
    isLoading: false,
  };

  componentDidMount() {
    this.validateProtectedRoute();
  }

  componentDidUpdate() {
    if (
      this.props.userReducer.authenticated &&
      _.includes(PAGES_REDIRECT_ON_LOGGED, this.props.history.location.pathname)
    ) {
      this.props.history.push(`/`);
    }
  }

  loginFromToken = (token: string) => {
    if (this.props.onLoginFromToken) {
      this.props.onLoginFromToken(token).then((result: any) => {
        if (result.hex_id) {
          this.setState({ isLoading: false });
        } else {
          this.props.history.push(`/signin?next=${this.props.page}`);
        }
      });
    }
  };

  validateProtectedRoute = () => {
    const token = getToken();
    if (this.props.isProtected && token && token !== null && token !== "") {
      this.setState({ isLoading: true });
      this.loginFromToken(token);
    } else if (this.props.isProtected) {
      //this.props.history.push(`/`);
      this.props.history.push(`/signin?next=${this.props.page}`);
    }
  };

  getContent = (props: IPageContainerProps) => {
    if (this.props.isFull) {
      return (
        <Grid
          fluid={true}
          className={
            this.props.isMarginTopActivated ? styles.marginVariable : ""
          }
        >
          <ChildrenWrapper marginTop={props.marginTop}>
            {this.props.children}
          </ChildrenWrapper>
        </Grid>
      );
    } else {
      return <div>{this.props.children}</div>;
    }
  };

  showPreloader = () => {
    return (
      this.props.showPreloader ||
      (this.props.isProtected && this.state.isLoading)
    );
  };

  showContent = () => {
    return (
      !this.showPreloader() &&
      (!this.props.isProtected ||
        (this.props.isProtected && this.props.userReducer.authenticated))
    );
  };

  render() {
    return (
      <section className={styles.vol7erPageContainer}>
        {this.showPreloader() && <V7Preloader />}
        {this.showContent() && this.getContent(this.props)}
      </section>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onLoginFromToken: (token: string) => dispatch(loginFromToken(token)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(V7PageContainer));
