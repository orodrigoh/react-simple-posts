import { Component } from "react";
import "./App.css";
import Home from "./components/Home/Home";

class App extends Component {
  render() {
    return (
      <section className="container">
        <Home />
      </section>
    );
  }
}
export default App;
