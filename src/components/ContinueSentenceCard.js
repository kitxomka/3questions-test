import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incrementCorrectAnswer, RANDOM_QUESTION } from "../redux/constants";
import ProgressBar from "./ProgresBar";
import { Container, Grid, Button, Typography, TextField } from "@mui/material";

const ContinueSentenceCard = () => {
  const [correctOrWrong, setCorrectOrWrong] = useState("");
  const [checkedValue, setCheckedValue] = useState("");
  const [activeDotIndex, setActiveDotIndex] = useState();

  const { userName, allCards } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveDotIndex(3 - allCards.length);
  }, [allCards.length]);

  const handleChange = (e) => {
    setCheckedValue(e.target.value);
  };

  const handleCheck = () => {
    if (checkedValue.length > 0) {
      if (checkedValue === "location") {
        setCorrectOrWrong("Correct");
        dispatch(incrementCorrectAnswer());
      } else {
        setCorrectOrWrong("Wrong");
      }
    } else {
      setCorrectOrWrong("There is no answer");
    }
  };

  const handleSubmit = () => {
    let randomNum = Math.floor(Math.random() * allCards.length);
    const nextPageLink =
      allCards.length > 0 ? "/" + allCards[randomNum].card : "/conclusion-card";

    dispatch({
      type: RANDOM_QUESTION,
      payload: randomNum
    });
    navigate(nextPageLink);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "10rem" }}>
      <Grid container>
        <Grid item xs={4} style={{ marginBottom: "1.5rem" }}>
          <Typography>Hello {userName}</Typography>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "1rem" }}>
          <Typography variant="h5" gutterBottom component="div">
            Continue the sentence
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ marginTop: "1rem" }}
        >
          <Grid item xs={12}>
            <Typography>
              In order to find him, thay needed to know his his exact
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "1rem" }}>
            <TextField
              id="standard-basic"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            style={{
              // border: "1px solid black",
              marginTop: "0.5rem",
              height: "30px"
            }}
          >
            <Typography style={{ fontWeight: "bold" }}>
              {correctOrWrong}
            </Typography>
          </Grid>
          {correctOrWrong ? (
            <Grid item xs={4} style={{ marginTop: "1rem" }}>
              <Button variant="outlined" onClick={handleSubmit}>
                Continue
              </Button>
            </Grid>
          ) : (
            <Grid item xs={4} style={{ marginTop: "1rem" }}>
              <Button variant="outlined" onClick={handleCheck}>
                Check
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <ProgressBar numberOfDots={3} activeDotIndex={activeDotIndex - 1} />
    </Container>
  );
};

export default ContinueSentenceCard;
