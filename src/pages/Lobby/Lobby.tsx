import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import "./Lobby.css";

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

  function startGame() {
    console.log("start game");
    console.log(code);
    const gameConfig = {
      code: code,
      viral: {
        name: "Daniel",
        image: "/pieces/viral-1.png",
      },
      survivors: [
        {
          name: "Marc",
          image: "/pieces/player-1.png",
        },
        {
          name: "John",
          image: "/pieces/player-2.png",
        },
        {
          name: "Jasper",
          image: "/pieces/player-3.png",
        },
        {
          name: "Jaime",
          image: "/pieces/player-4.png",
        },
      ],
    };
    socket.emit("start", gameConfig);
    socket.on("started", (game: any) => {
      console.log("game started");
      navigate("/game/" + game.code);
    });
  }

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code: code });
    navigate("/");
  }

  // List of viral icons
  const viralImages = ["/pieces/viral-1.png", "/pieces/viral-2.png"];

  // List of survivor icons
  const survivorImages = [
    "/pieces/player-1.png",
    "/pieces/player-2.png",
    "/pieces/player-3.png",
    "/pieces/player-4.png",
    "/pieces/player-5.png",
    "/pieces/player-6.png",
    "/pieces/player-7.png",
    "/pieces/player-8.png",
  ];

  // Default three players
  const players = [
    {
      playerRole: "Viral",
      image: "/pieces/viral-1.png",
      playerName: "Player",
    },
    {
      playerRole: "Survivor",
      image: "/pieces/player-1.png",
      playerName: "Player",
    },
    {
      playerRole: "Survivor",
      image: "/pieces/player-2.png",
      playerName: "Player",
    },
  ];

  const [playerList, setPlayerList] = useState(players); // Stores the information of the current players

  function addPlayer() {
    let newList = [...playerList];
    let usedImages = newList.map((player) => player.image); // survivor icons that are already used by other players
    const availableImages = survivorImages.filter((image) => !usedImages.includes(image)); // survivor icons not yet used

    if (playerList.length <= 5) {
      // Only 5 total players are allowed (1 - Viral, 4 - Survivors)
      newList.push({
        playerRole: "Survivor",
        image: availableImages[Math.floor(Math.random() * availableImages.length)], // Set a random image not yet used by other survivors
        playerName: "Player",
      });
    }
    setPlayerList(newList); // updates the playerList
  }

  function removePlayer(index: number) {
    let newList = [...playerList];
    newList.splice(index, 1); // Remove the player from the playerList
    setPlayerList(newList);
  }

  return (
    <div className="game-setup">
      <h1>Lobby</h1>
      <div className="flex">
        {playerList.map((player, index) => (
          <div className="player" key={index}>
            {index > 2 ? (
              <button className="remove-player" onClick={() => removePlayer(index)}>
                <p className="button-text">&#10006;</p>
              </button>
            ) : null}
            <h2 className="player-role">{player.playerRole}</h2>
            <div className="image-container">
              <button className="change-image" onClick={() => console.log("move left")}>
                &#8249;
              </button>
              <img src={player.image} className="player-avatar"></img>
              <button className="change-image" onClick={() => console.log("move right")}>
                &#8250;
              </button>
            </div>
            <input
                className="player-name"
                type="text"
                defaultValue={player.playerName}
                onChange={(e) => (player.playerName = e.target.value)}
              />
          </div>
        ))}
        {playerList.length < 5 ? (
          <button className="add-player" onClick={addPlayer}>
            &#x2b;
          </button>
        ) : null}
      </div>

      <div>
        <button className="start-game" onClick={startGame}>
          Start Game
        </button>
        <button className="cancel-game" onClick={deleteGame}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Lobby;
