import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ADD_NAME, RANDOM_QUESTION } from "../redux/constants";
import { Button, TextField, Container, Grid, Typography } from "@mui/material";

import "../styles.css";

const HomeCard = () => {
  const [checkName, setCheckName] = useState("");
  const { userName, allCards } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddName = (e) => {
    dispatch({
      type: ADD_NAME,
      payload: e.target.value
    });
  };

  // random navigation
  const handleNameSubmit = (e) => {
    if (userName) {
      let randomNum = Math.floor(Math.random() * allCards.length);

      dispatch({
        type: RANDOM_QUESTION,
        payload: randomNum
      });
      navigate("/" + allCards[randomNum].card);
    } else {
      setCheckName("There is no name");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20rem" }}>
      <Grid container>
        <Grid item xs={12} style={{ height: "70px" }}>
          <TextField
            required
            id="outlined-basic"
            label="Enter your name"
            variant="outlined"
            onChange={handleAddName}
          />
        </Grid>
        {checkName ? (
          <Grid
            item
            xs={12}
            style={{
              // border: "1px solid black",
              height: "30px"
            }}
          >
            <Typography style={{ color: "red" }}>Name is required</Typography>
          </Grid>
        ) : null}

        <Grid item xs={4} style={{ marginTop: "0.5rem" }}>
          <Button variant="outlined" onClick={handleNameSubmit}>
            continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeCard;
