import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import AllProducts from "./pages/AllProducts";
import Habanos from "./pages/Habanos";
import Cigarros from "./pages/Cigarros";
import Cigarritos from "./pages/Cigarritos";
import TabacosPipa from "./pages/TabacosPipa";
import TabacosArmar from "./pages/TabacosArmar";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/tabacosArmar">
          <Header />
            <TabacosArmar/>
          </Route>
        <Route path="/tabacosPipa">
          <Header />
            <TabacosPipa/>
          </Route>
        <Route path="/cigarritos">
          <Header />
            <Cigarritos/>
          </Route>
        <Route path="/cigarros">
          <Header />
            <Cigarros/>
          </Route>
        <Route path="/habanos">
          <Header />
            <Habanos/>
          </Route>
        <Route path="/allProducts">
          <Header />
            <AllProducts/>
          </Route>
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
