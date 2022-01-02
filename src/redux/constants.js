export const ADD_NAME = "ADD_NAME";

export const CORRECT_ANSWERS = "CORRECT_ANSWERS";

export const RANDOM_QUESTION = "RANDOM_QUESTION";

export const incrementCorrectAnswer = () => {
  return {
    type: "CORRECT_ANSWERS"
  };
};
