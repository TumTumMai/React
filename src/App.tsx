import { Routes, Route } from "react-router-dom";
import Pages, { IRoutes } from "constants/routes";
import MiddlewareRotue from "middleware/route";
import Error from "pages/error";
import Load from "components/Load";

const App = (): JSX.Element => {
  return (
    <div className="App h-screen bg-gradient-to-br from-white to-slate-400">
      <Load />
      <Routes>
        {!!Pages &&
          Pages.map((item: IRoutes, index: number) => {
            return (
              <Route
                key={index}
                path={item.path}
                element={<MiddlewareRotue {...item} />}
              >
                <Route path={item.path} element={item.element} />
              </Route>
            );
          })}
        <Route path={"*"} element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
