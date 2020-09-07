import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./App.css";
import LeftComponents from "./components/LeftComponents";
import RightComponents from "./components/RightComponents";
import Reducer from "./Reducers";

const App = () => {
  const store = createStore(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return (
    <div className="container">
      <Provider store={store}>
        <LeftComponents />
        <RightComponents />
      </Provider>
    </div>
  );
};

export default App;
