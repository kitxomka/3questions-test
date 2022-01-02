import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incrementCorrectAnswer, RANDOM_QUESTION } from "../redux/constants";
import ProgressBar from "./ProgresBar";
import { Container, Grid, Button, Typography } from "@mui/material";
import { useDrop } from "react-dnd";
import Picture from "./Picture";
import pictureList from "../images/images";

// random images
for (let i = 0; i < pictureList.length; i++) {
  let x = pictureList[i];
  let y = Math.floor(Math.random() * (i + 1));
  pictureList[i] = pictureList[y];
  pictureList[y] = x;
}

const DragDropCard = () => {
  const [board, setBoard] = useState([]);
  const [correctOrWrong, setCorrectOrWrong] = useState("");
  const [activeDotIndex, setActiveDotIndex] = useState();
  const { userName, allCards } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ isDropping }, refDrop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isDropping: !!monitor.isOver()
    })
  }));

  const addImageToBoard = (id) => {
    debugger;
    const fitered = pictureList.filter((picture) => {
      return id === picture.id;
    });
    setBoard((board) => [...board, fitered[0]]);
  };

  useEffect(() => {
    setActiveDotIndex(3 - allCards.length);
  }, [allCards.length]);

  const handleCheck = () => {
    if (board.length > 0) {
      if (
        board[0].id === 1 &&
        board[1].id === 2 &&
        board[2].id === 3 &&
        board[3].id === 4
      ) {
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
    console.log("randomNum", randomNum);
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
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom component="div">
            Drag and Drop question
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs={12} className="drag">
            {pictureList.map((picture) => {
              console.log("picture", picture);
              return (
                <Picture key={picture.id} id={picture.id} src={picture.src} />
              );
            })}
          </Grid>
          <Grid
            item
            xs={12}
            ref={refDrop}
            style={{
              border: "1px solid #eee",
              borderRadius: "2px",
              backgroundColor: "#eee",
              height: "130px"
            }}
          >
            {board.map((picture) => {
              return (
                <Picture key={picture.id} id={picture.id} src={picture.src} />
              );
            })}
          </Grid>
        </Grid>
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
      <ProgressBar numberOfDots={3} activeDotIndex={activeDotIndex - 1} />
    </Container>
  );
};

export default DragDropCard;
