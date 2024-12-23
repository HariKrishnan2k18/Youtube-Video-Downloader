import { Provider } from "react-redux";
import "./App.css";
import Router from "./Routes";
import store from "./data/store";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
