import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./index.css";

const Demo1 = lazy(() => import("./pages/demo1"));

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="demo1"
        element={
          <Suspense>
            <Demo1 />
          </Suspense>
        }
      />
      <Route index element={<Navigate to="demo1" />} />
      <Route path="*" element={<div>该页面不存在</div>} />
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
