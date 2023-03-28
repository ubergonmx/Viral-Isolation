import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import "./Lobby.css";
import Player from "./PlayerCard/Player";

function Lobby() {
  const { code } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    socket.emit("join", { code: code });

    socket.on("error", (data) => {
      if(data.action === "goHome")
        navigate("/", { state: { error: data.message }});
    });
    return () => {
      socket.off("error")
    }
  }, []);

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code });
    navigate("/");
  }


  const players = [
    // temporary
    {
      name: "Viral Player 1",
      image: "/src/assets/viral-temporary-pic.jpg",
      code: 123456,
    },
    {
      name: "Survivor Player 1",
      image: "/src/assets/survivor-temporary-pic.png",
      code: 123457,
    },
    {
      name: "Survivor Player 2",
      image: "/src/assets/survivor-temporary-pic.png",
      code: 123458,
    },
    {
      name: "Survivor Player 3",
      image: "/src/assets/survivor-temporary-pic.png",
      code: 123459,
    },
    {
      name: "Survivor Player 4",
      image: "/src/assets/survivor-temporary-pic.png",
      code: 123460,
    },
  ];

  function addPlayer() {
    console.log("Hello");
  }

  return (
    <div className="game-setup">
      <h1>Lobby</h1>
      <div className="flex">
        {players.map((player) => (
          <Player key={player.code} name={player.name} image={player.image} code={player.code} />
        ))}

        <button className="add-button" onClick={addPlayer}>
          &#x2b;
        </button>
      </div>

      <div>
        <button>Start Game</button>
        <button onClick={deleteGame}>Cancel</button>
      </div>
    </div>
  );
}

export default Lobby;
