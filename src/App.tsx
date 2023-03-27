import { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import viralIsolationLogo from "./assets/viral-isolation.svg";
import "./App.css";

//use lazy instead
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Lobby = lazy(() => import("./pages/Lobby/Lobby"));
const Game = lazy(() => import("./pages/Game/Game"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

import { Provider, ErrorBoundary } from "@rollbar/react";

const rollbarConfig = {
  accessToken: "b72b1a50553344729791314f58479ae8",
  environment: "testenv",
};

function TestError() {
  const a = null;
  return a.hello();
}

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <div className="App">
          <SocketProvider>
            <Routes>
              <Route path="/" element={<NavWrapper />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
              </Route>
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/game" element={<Game />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SocketProvider>
        </div>
        <TestError />
      </ErrorBoundary>
    </Provider>
  );
}

function NavWrapper() {
  return (
    <>
      <div>
        <img src={viralIsolationLogo} className="logo" alt="Viral Isolation logo" />
      </div>

      <nav className="flex justify-center">
        <ul className="flex">
          <li className="mx-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li className="mx-4">
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </li>
        </ul>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
