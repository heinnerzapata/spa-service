import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { COLORS } from "variables/constants";

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
  useEffect(() => {}, [props]);
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
      type={props.type}
      autoComplete="off"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {props.icon ? props.icon : null}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Input;
