import { useEffect, useState } from "react";
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
      if (data.action === "goHome") navigate("/", { state: { error: data.message } });
    });
    return () => {
      socket.off("error");
    };
  }, []);

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code });
    navigate("/");
  }

  let players = [
    {
      playerRole: "Viral",
      image: "/pieces/viral-1.png",
      playerName: "Aaron",
    },
    {
      playerRole: "Survivor",
      image: "/pieces/player-1.png",
      playerName: "Marc",
    },
    {
      playerRole: "Survivor",
      image: "/pieces/player-2.png",
      playerName: "John",
    },
    {
      playerRole: "Survivor",
      image: "/pieces/player-3.png",
      playerName: "Jasper",
    },
    {
      playerRole: "Survivor",
      image: "/pieces/player-4.png",
      playerName: "Jaime",
    },
  ];

  const [playerCount, setPlayerCount] = useState(3);

  function addPlayer() {
    setPlayerCount(playerCount + 1);
  }

  function removePlayer(index: number) {
    setPlayerCount(playerCount - 1);
  }

  return (
    <div className="game-setup">
      <h1>Lobby</h1>
      <div className="flex">
        {players.splice(0, playerCount).map((player, index) => (
          <div className="player">
            {index > 2 ? (
              <button className="remove-player" onClick={() => removePlayer(index)}>
                <p className="button-text">&#10006;</p>
              </button>
            ) : null}
            <Player key={index} playerRole={player.playerRole} image={player.image} playerName={player.playerName} />
          </div>
        ))}

        {playerCount < 5 ? (
          <button className="add-player" onClick={addPlayer}>
            &#x2b;
          </button>
        ) : null}
      </div>

      <div>
        <button className="start-game">Start Game</button>
        <button className="cancel-game" onClick={deleteGame}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Lobby;
