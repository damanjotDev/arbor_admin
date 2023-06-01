import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, FormHelperText } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { useLocation } from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material"
import {profileSettingStyles} from "../../styles/materialComponent"
const theme = createTheme()
const useStyles = makeStyles(()=>({
  container:{
    width:690,
    [theme.breakpoints.down("lg")]:{
      width:540
    }
  }
}))
const Phone = ({
  value = "",
  onChange = () => {},
  label,
  maxLength = 10,
  error,
  width = "",
  secure = false,
  disabled,
  ...tprops
}) => {
  const location = useLocation()
  const classes = profileSettingStyles()

  const [val, setValue] = useState("");
  useEffect(() => setValue(value), [value]);
  const onTextChange = (no, country) => {
    console.log("code", no, country);
    onChange(no, country)
  };
  
  return (
    <div className={classes.textField}>
    <PhoneInput
      label={label}
      enableSearch={true}
      inputStyle={{
        height:50,
        width:"100%",
        backgroundColor:"#FCFBFD"
      }}
        error={error}
        country={"us"}
        value={val}
        onChange={(value, country) => onTextChange(value, country.dialCode)}
        inputProps={
          { readOnly: disabled }
        }
      />
      {error && (
        <FormHelperText>
          {error}
        </FormHelperText>
      )}
    </div>
  );
};

export default  Phone