import { h, Component } from "preact";
import { Router } from "preact-router";

import SocialHeader from "./socialheader";
import Home from "../routes/home";

export default class App extends Component {

  /** Gets fired when the route changes.
   *  @param {Object} event    "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url  The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <SocialHeader />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
        </Router>
        {
          typeof window === "undefined" && (
            <noscript>
              <style>{".noscript-hide { display: none !important; }"}</style>
            </noscript>
          )
        }
      </div>
    );
  }
}
