import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useDrag } from "react-dnd";

const useStyles = makeStyles({
  dragablePic: {
    width: "110px",
    height: "110px",
    margin: "5px"
  }
});

const Picture = ({ id, src }) => {
  const [{ draggind }, refDrag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      draggind: !!monitor.isDragging()
    })
  }));

  const classes = useStyles();
  return (
    <img
      ref={refDrag}
      className={classes.dragablePic}
      src={src}
      alt=""
      style={{
        cursor: "grab",
        border: draggind ? "1px solid black" : "0px"
      }}
    />
  );
};

export default Picture;
