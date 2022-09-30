import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Link, Route, Routes } from "react-router-dom";

import "./index.css";

const Demo1 = lazy(() => import("./pages/demo1"));
const Demo2 = lazy(() => import("./pages/demo2"));
const Demo3 = lazy(() => import("./pages/fireworks"));
const Demo4 = lazy(() => import("./pages/gobang"));

const App = () => (
  <HashRouter>
    <Routes>
      <Route
        index
        element={
          <div className="navBtnBox">
            <Link className="navBtn" to="demo1">
              demo1
            </Link>
            <Link className="navBtn" to="demo2">
              demo2
            </Link>
            <Link className="navBtn" to="demo3">
              fireworks
            </Link>
            <Link className="navBtn" to="demo4">
              gobang
            </Link>
          </div>
        }
      />
      <Route
        path="demo1"
        element={
          <Suspense>
            <Demo1 />
          </Suspense>
        }
      />
      <Route
        path="demo2"
        element={
          <Suspense>
            <Demo2 />
          </Suspense>
        }
      />
      <Route
        path="demo3"
        element={
          <Suspense>
            <Demo3 />
          </Suspense>
        }
      />
      <Route
        path="demo4"
        element={
          <Suspense>
            <Demo4 />
          </Suspense>
        }
      />
      <Route path="*" element={<div>该页面不存在</div>} />
    </Routes>
  </HashRouter>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
