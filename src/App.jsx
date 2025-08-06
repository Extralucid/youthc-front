import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import NotFound from "./pages/NotFound";
import ROUTES from "./routes/routes";
import { Provider } from "react-redux";
import store from "./stores/auth.store";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  //Wrapper component that adds layout
   const renderWrappedRoute = (route) => (
    <Route
      key={route.path}
      path={route.path}
      element={route.noLayout ? route.element : (
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          {route.element}
        </Layout>
      )}
    >
      {route.children?.map(renderWrappedRoute)}
    </Route>
  );

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {ROUTES.map(renderWrappedRoute)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
