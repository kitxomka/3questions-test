import React from "react";
import { Grid } from "@mui/material";

const Dot = {
  border: "1px solid gray",
  width: "20px",
  height: "20px",
  borderRadius: "15px",
  backgroundColor: "gray"
};

const ActiveDot = {
  border: "1px solid #4d4d4d",
  width: "20px",
  height: "20px",
  borderRadius: "15px",
  backgroundColor: "#4d4d4d"
};

const ProgressBar = ({ numberOfDots, activeDotIndex }) => {
  const runCallback = (cb) => {
    return cb();
  };

  return (
    <Grid
      container
      style={{ width: "100%", marginTop: "5rem", marginLeft: "14rem" }}
    >
      {runCallback(() => {
        const dotRow = [];
        for (let i = 0; i < numberOfDots; i++) {
          if (activeDotIndex === i) {
            dotRow.push(
              <Grid item xs={1}>
                <Grid item style={ActiveDot} id={i} className="dot"></Grid>
              </Grid>
            );
          } else {
            dotRow.push(
              <Grid item xs={1}>
                <Grid item style={Dot} id={i} className="dot"></Grid>
              </Grid>
            );
          }
        }
        return dotRow;
      })}
    </Grid>
  );
};

export default ProgressBar;
