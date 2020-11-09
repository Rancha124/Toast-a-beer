import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FeedView from "./Components/FeedView/FeedView";
import DashBoard from "./Components/DashBoard/DashBoard";
import CompleteDetails from "./Components/CompleteDetails/CompleteDetails";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={FeedView} />
          <Route path="/dashboard" exact component={DashBoard} />
          <Route path="/beer/:id" exact component={CompleteDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
