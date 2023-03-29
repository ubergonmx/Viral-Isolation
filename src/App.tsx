import { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import "./App.css";

//Use React.lazy to lazy load components
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Lobby = lazy(() => import("./pages/Lobby/Lobby"));
const Game = lazy(() => import("./pages/Game/Game"));
const Result = lazy(() => import("./pages/Result/Result"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

// Rollbar
import { Provider, ErrorBoundary } from "@rollbar/react";

const rollbarConfig = {
  accessToken: "b72b1a50553344729791314f58479ae8",
  environment: "testenv",
};

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
              <Route path="/lobby/:code" element={<LobbyWithFallback />} />
              <Route path="/game/:code" element={<GameWithFallback />} />
              <Route path="/results/:code" element={<ResultWithFallback />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SocketProvider>
        </div>
      </ErrorBoundary>
    </Provider>
  );
}

function LobbyWithFallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lobby />
    </Suspense>
  );
}

function GameWithFallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Game />
    </Suspense>
  );
}

function ResultWithFallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Result /> */}
      <h1>Currently in development...</h1>
    </Suspense>
  );
}

function NavWrapper() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex justify-center">
          <img src="/viral-isolation.svg" className="logo" alt="Viral Isolation logo" />
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

        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
