import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incrementCorrectAnswer, RANDOM_QUESTION } from "../redux/constants";
import ProgressBar from "./ProgresBar";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from "@mui/material";

const AmericanCard = () => {
  const [correctOrWrong, setCorrectOrWrong] = useState("");
  const [checkedValue, setCheckedValue] = useState("");
  const [activeDotIndex, setActiveDotIndex] = useState();
  const { userName, allCards } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveDotIndex(3 - allCards.length);
  }, [allCards.length]);

  const handleChecked = (e) => {
    setCheckedValue(e.target.value);
  };

  const handleCheck = (e) => {
    if (checkedValue.length > 0) {
      if (checkedValue === "tacos") {
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
            American question
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "1rem" }}>
          <Typography style={{ fontSize: "1rem" }}>
            What is a very popular to eat on a Thuesday in America?
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "0.5rem" }}>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="answer" name="radio-buttons-group">
              <FormControlLabel
                value="pizza"
                control={<Radio />}
                label="Pizza"
                onChange={handleChecked}
              />
              <FormControlLabel
                value="tacos"
                control={<Radio />}
                label="Tacos"
                onChange={handleChecked}
              />
              <FormControlLabel
                value="burgers"
                control={<Radio />}
                label="Burgers"
                onChange={handleChecked}
              />
              <FormControlLabel
                value="frideChicken"
                control={<Radio />}
                label="Fride Chicken"
                onChange={handleChecked}
              />
            </RadioGroup>
          </FormControl>
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

export default AmericanCard;
