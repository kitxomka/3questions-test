import { ADD_NAME, CORRECT_ANSWERS, RANDOM_QUESTION } from "./constants";

const initialState = {
  userName: "",
  corectAnswers: 0,
  allCards: [
    { id: 1, card: "american-card" },
    { id: 2, card: "continue-sentence-card" },
    { id: 3, card: "drag-drop-card" }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NAME:
      return {
        ...state,
        userName: action.payload
      };
    case CORRECT_ANSWERS:
      return {
        ...state,
        corectAnswers: state.corectAnswers + 1
      };
    case RANDOM_QUESTION: {
      const selectedCard = state.allCards[action.payload];
      debugger;
      const filteredCards = state.allCards.filter(
        (card) => card.id !== selectedCard.id
      );

      return {
        ...state,
        allCards: filteredCards
      };
    }
    default:
      return state;
  }
};

export default reducer;
