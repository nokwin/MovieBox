import React from "react";
import ReactDOM from "react-dom";

import genresStore from "./store/mobx-store-genres";
import App from "./App";

ReactDOM.render(
  <App genresStore={genresStore} />,
  document.getElementById("root")
);
