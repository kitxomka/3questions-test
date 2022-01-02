import { Provider } from "react-redux";
import { store } from "./redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeCard from "./components/HomeCard";
import AmericanCard from "./components/AmericanCard";
import ContinueSentenceCard from "./components/ContinueSentenceCard";
import DragDropCard from "./components/DragDropCard";
import ConclusionCard from "./components/ConclusionCard";
import "./styles.css";

const App = () => {
  return (
    <Provider store={store}>
      <DndProvider debugMode={true} backend={HTML5Backend}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" exact element={<HomeCard />} />
              <Route path="/american-card" exact element={<AmericanCard />} />
              <Route
                path="/continue-sentence-card"
                exact
                element={<ContinueSentenceCard />}
              />
              <Route path="/drag-drop-card" exact element={<DragDropCard />} />
              <Route
                path="/conclusion-card"
                exact
                element={<ConclusionCard />}
              />
            </Routes>
          </Router>
        </div>
      </DndProvider>
    </Provider>
  );
};

export default App;
