import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";

function generateCode() {
  let code = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

function Home() {
  const socket = useSocket();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [lobbies, setLobbies] = useState([]);
  const [games, setGames] = useState([]);
  const [results, setResults] = useState([]);

  //get lobbies
  useEffect(() => {
    socket.emit("get-lobbies");
    socket.on("lobbies", (rooms: any) => {
      // console.log(rooms);
      setLobbies(rooms);
    });

    socket.emit("get-games");
    socket.on("games", (rooms: any) => {
      // console.log(rooms);
      setGames(rooms);
    });

    socket.emit("get-results");
    socket.on("results", (rooms: any) => {
      // console.log(rooms);
      setResults(rooms);
    });

    socket.on("created", (room: any) => {
      console.log("lobby created");
      navigate("/lobby/" + room.code);
    });
    return () => {
      socket.off("lobbies");
      socket.off("games");
      socket.off("results")
      socket.off("created");
    };
  }, []);

  //create game
  function createGame() {
    socket.emit("create", { code: generateCode() });
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-title">Viral Isolation</h1>
      <button onClick={createGame}>Create a new game</button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <br />
      <div className="grid grid-cols-3 divide-x px-4">
        <div className="grid px-2 gap-2 content-start">
          <h2>Open Lobbies</h2>
          {lobbies.length > 0 &&
            lobbies.map((lobby: any) => (
              <button key={lobby} className="h-10" onClick={() => navigate("/lobby/" + lobby)}>
                {lobby}
              </button>
            ))}
        </div>
        <div className="grid px-2 gap-2 content-start">
          <h2>Open Games</h2>
          {games.length > 0 &&
            games.map((game: any) => (
              <button key={game} className="h-10" onClick={() => navigate("/game/" + game)}>
                {game}
              </button>
            ))}
        </div>
        <div className="grid px-2 gap-2 content-start">
          <h2>Results</h2>
          {results.length > 0 &&
            results.map((result: any) => (
              <button key={result} className="h-10" onClick={() => navigate("/results/" + result)}>
                {result}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
