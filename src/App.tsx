// import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import Router from "./Routes";
import store from "./data/store";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
