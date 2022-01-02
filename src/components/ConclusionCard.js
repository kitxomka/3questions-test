import React from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Typography } from "@mui/material";

const ConclusionCard = () => {
  const { userName, corectAnswers } = useSelector((state) => state);
  return (
    <Container maxWidth="sm" style={{ marginTop: "20rem" }}>
      <Grid container>
        <Typography>{userName}, you have completed the test.</Typography>
        <Typography>
          You answered correctly on {corectAnswers} questions out of 3.
        </Typography>
      </Grid>
    </Container>
  );
};

export default ConclusionCard;
