import React from "react";
import Button from "@material-ui/core/Button";
import styles from "./V7Button.module.scss";
import { withStyles } from "@material-ui/core/styles";
import { COLORS } from "variables/constants";

interface v7ButtonProps {
  disabled: boolean;
  text: string;
  type: string;
  onClick?: (e: any) => void;
  size?: "small" | "medium" | "large";
}

const StyledButton = withStyles({
  root: {
    backgroundColor: COLORS.vol7erMain,
    "&:hover": {
      backgroundColor: COLORS.vol7erMainLight,
    },
  },
})(Button);

const V7Button: React.SFC<v7ButtonProps> = (props) => {
  const onClick = (e: any) => {
    if (props.type !== "submit") {
      e.preventDefault();
      if (props.onClick) {
        props.onClick(e);
      }
    }
  };

  return (
    <button
      className={styles.v7Button}
      type={props.type === "submit" ? "submit" : "button"}
    >
      <StyledButton
        disabled={props.disabled}
        onClick={(e) => onClick(e)}
        variant="contained"
        size={props.size ? props.size : "medium"}
      >
        {props.text}
      </StyledButton>
    </button>
  );
};

export default V7Button;
