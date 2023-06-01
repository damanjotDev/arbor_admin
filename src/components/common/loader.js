import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const commonStyle = makeStyles(()=>({

    loaderV: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },

}))
const loaderStyle = { color: "#fff" }

 const Loader = ({ size = 30, style = {}, color = "white", time = 5000 }) => {
  const classes = commonStyle();

  const [state, setState] = useState(true);

  useEffect(() => {
    const intervalCode = setTimeout(() => {
      setState(false);
    }, time);

    return () => {
      clearTimeout(intervalCode);
    };
  }, []);

  return (
    <>
      {state && (
        <div className={classes.loaderV}>
          <CircularProgress size={size} style={{ ...loaderStyle, ...style }} />
        </div>
      )}
    </>
  );
};

export default Loader