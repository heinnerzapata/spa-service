import React from "react";
import "./V7Preloader.scss";
import { V7Logo } from "components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { COLORS } from "variables/constants";

interface v7PreloaderProps {}

const StyledCircularProgress = withStyles({
  colorPrimary: {
    color: `${COLORS.vol7erMain}`,
  },
})(CircularProgress);

const V7Preloader: React.SFC<v7PreloaderProps> = (props) => {
  return (
    <div className="vol7er-preloader">
      <StyledCircularProgress />
      <V7Logo
        className="vol7er-preloader__logo"
        isScrollTop={false}
        fontSize={26}
      />
    </div>
  );
};

export default V7Preloader;
