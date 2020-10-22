import React, { useEffect, useState } from "react";

import { COLORS } from "variables/constants";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { V7Icon } from "components";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import styles from "./v7TextField.module.scss";
import { withStyles } from "@material-ui/core/styles";

interface IInputProps {
  id: string;
  name: string;
  error?: boolean;
  default?: string;
  value?: string;
  label: string;
  disabled?: boolean;
  type: string;
  errorText: string;
  icon: any;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

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
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: `${COLORS.vol7erTitleGray}`,
      },
    },
  },
})(TextField);

const Input: React.SFC<IInputProps> = (props) => {
  const [type, setType] = useState(props.type);
  const [showPassword, setShowPassword] = useState(true);

  const onIconClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setType(props.type);
  }, [props]);
  
  return (
    <StyledInput
      id={props.id}
      disabled={props.disabled}
      name={props.name}
      error={props.error}
      onChange={props.onChange}
      onBlur={props.onBlur}
      value={props.value || ""}
      label={props.label}
      defaultValue={props.default}
      helperText={props.errorText}
      variant="outlined"
      type={showPassword ? type : "text"}
      autoComplete="off"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {props.type === "password" && (
              <div onClick={onIconClickHandler}>
                <V7Icon className={styles.eyeIcon} icon={faEye} size={"1x"} />
              </div>
            )}
            {props.icon ? props.icon : null}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Input;
