import { h, Component } from "preact";
import { Router } from "preact-router";

import SocialHeader from "./socialheader";
import Home from "../routes/home";

export default class App extends Component {


  /*
   * Defines what window.location.hash we automatically clear
   */
  static clearHashes = [
    "#recruitment",
    "#positions"
  ];

  onHashChange = (e) => {
    if (App.clearHashes.indexOf(window.location.hash) >= 0) {
      history.replaceState({}, document.title, ".");
    }
  };

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", this.onHashChange, false);
      this.onHashChange();
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("hashchange", this.onHashChange, false);
    }
  }

  render() {
    return (
      <div id="app">
        <SocialHeader />
        <Router>
          <Home path="/" />
        </Router>
      </div>
    );
  }
}
