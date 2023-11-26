import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "./context/context";
import router from "./routes";

const App = () => {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
