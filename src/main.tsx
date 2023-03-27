import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// import { Provider, ErrorBoundary } from "@rollbar/react";

// const rollbarConfig = {
//   accessToken: 'b72b1a50553344729791314f58479ae8',
//   environment: 'testenv',
// };

// function TestError() {
//   const a = null;
//   return a.hello();
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <Provider config={rollbarConfig}>
      <ErrorBoundary> */}
    <BrowserRouter>
      <App />
      {/* <TestError /> */}
    </BrowserRouter>
    {/* </ErrorBoundary>
    </Provider> */}
  </React.StrictMode>,
);
