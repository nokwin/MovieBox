import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/index";
import MobxStore from "./store/mobx-store";
import App from "./App";

const AppStore = new MobxStore();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App appStore={AppStore} />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
