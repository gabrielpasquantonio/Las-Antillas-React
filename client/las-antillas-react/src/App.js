import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        
          <Route path="/login">
          <Header />
            <LogIn />
          </Route>
          <Route path="/home">
          <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
