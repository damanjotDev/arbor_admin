import React, { useState } from "react";
import Datepicker from "react-datepicker";
import { Grid } from "@mui/material"
import { profileSettingStyles } from "../../styles/materialComponent";
import "react-datepicker/dist/react-datepicker.css";


function DatePicker({name="", onChange=()=>{}, value}) {
  const [startDate, setStartDate] = useState(new Date());
  const classes = profileSettingStyles()
  console.log("dataert", startDate.toISOString())
  console.log("value", value, name)

  return (
    <div className={classes.textField}>
      <Datepicker
        selected={startDate}
        onChange={(date) => {
            setStartDate(date) 
            onChange(date)
        }}
        peekNextMonth
        name={name}
        value={value}
        showMonthDropdown
        className={classes.dateInput}  
        showYearDropdown
        dateFormat="dd/MM/yyyy"  
        dropdownMode="select"
      />
      </div>
  )
}

export default DatePicker