import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Welcome from "./pages/Welcome";
import AllLists from "./pages/AllLists";
import List from "./components/List";
import Footer from "./components/Footer";

// each key is the name of a filter; each value is the behavior associated with that name
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

function App() {
  return (
    <div className="mainWrapper">
      <Header />
      <Router>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/lists" exact element={<AllLists />} />
          <Route
            path="/lists/:listId"
            element={<List filterMap={FILTER_MAP} />}
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

