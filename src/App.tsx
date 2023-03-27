import { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { SocketProvider } from "./context/SocketContext";

//use lazy instead
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Lobby = lazy(() => import("./pages/Lobby/Lobby"));
const Game = lazy(() => import("./pages/Game/Game"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
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
  );
}

function NavWrapper() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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
