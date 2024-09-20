import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import App from "./App";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./components/reducers/index";

// Route
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
const store = createStore(rootReducer, composeWithDevTools());

// Get the root element from the DOM
const rootElement = document.getElementById("root");

// Create a root using React 18's createRoot API
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
