import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";

/* 관리자 페이지는 일반 방문자가 받지 않도록 별도 청크로 분리한다 */
const LogPage = lazy(() => import("./pages/Log"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/log"
            element={
              <Suspense fallback={null}>
                <LogPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>
);
