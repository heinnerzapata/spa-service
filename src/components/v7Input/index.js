import React, { useEffect } from "react";
import { Row, Col } from "react-flexbox-grid";
import { withFormsy } from "formsy-react";
import TextField from "@material-ui/core/TextField";
import styles from "./v7Input.module.scss";
import { COLORS } from "variables/constants";
import { withStyles } from "@material-ui/core/styles";

const StyledInput = withStyles({
  root: {
    width: "100%",
    marginBottom: "8px",
    minHeight: "78px",
    "& label.Mui-focused": {
      color: `${COLORS.vol7erMain}`,
    },
    "& label": {
      color: `${COLORS.vol7erTitleGray}`,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: `${COLORS.vol7erMain}`,
    },
    "& .MuiFilledInput-underline.Mui-error:after": {
      borderBottomColor: `${COLORS.error}`,
    },
    "& input.Mui-focused:after": {
      color: `${COLORS.vol7erTitleGray}`,
    },
    "& .MuiInputBase-input": {
      color: `${COLORS.white}`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.vol7erTitleGray}`,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.vol7erMain}`,
    },
  },
})(TextField);

const V7Input = (props) => {
  const [isError, setIsError] = React.useState(false);

  const onChange = (event) => {
    props.setValue(event.currentTarget.value);
    setIsError(shouldShowError);
  };

  useEffect(() => {
    if (props.defaultValue) {
      props.setValue(props.defaultValue);
    }
    setIsError(shouldShowError);
  }, [props]);

  const shouldShowError = () => {
    return props.errorMessage && props.value !== undefined;
  };

  return (
    <div className={styles.vol7erInput}>
      <Row middle="xs">
        {props.icon && (
          <Col className={styles.icon} xs={1}>
            {props.icon}
          </Col>
        )}
        <Col xs={props.icon ? 11 : 12}>
          <StyledInput
            error={isError}
            onChange={onChange}
            label={props.label}
            defaultValue={props.defaultValue}
            helperText={isError && props.errorMessage}
            variant="outlined"
            type={props.type}
          />
        </Col>
      </Row>
    </div>
  );
};

export default withFormsy(V7Input);
