import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { IHouse } from "../Game/GameInterface";
import "./Lobby.css";

const config = {
  numOfHouses: 17,
  numOfSurvivors: 4,
  totalItemCapacity: 44,
};

function getRandomCapacityNum(pool: any) {
  let randomNum = Math.floor(Math.random() * pool.numOfSurvivors) + 1;
  const capacity = Math.min(randomNum, pool.totalItemCapacity);
  pool.totalItemCapacity -= capacity;
  return capacity;
}

function generateHouses(config: any): IHouse[] {
  const houses = [];
  for (let i = 0; i < config.numOfHouses; i++) {
    let num = getRandomCapacityNum(config);
    houses.push({
      id: i + 1,
      itemCapacity: num,
      numOfItems: num,
    });
  }

  while (config.totalItemCapacity > 0) {
    const randomHouse = Math.floor(Math.random() * houses.length);
    if (houses[randomHouse].itemCapacity < 4) {
      houses[randomHouse].itemCapacity += 1;
      houses[randomHouse].numOfItems += 1;
      config.totalItemCapacity -= 1;
    }
  }

  return houses;
}

function Lobby() {
  const { code } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    socket.emit("join", { code: code });
    socket.on("error", (data) => {
      if (data.action === "goHome") navigate("/", { state: { error: data.message } });
    });
    socket.on("end", (data) => {
      if (data.hasGameEnded) navigate(`/results/${data.code}`);
    });
    socket.on("game-config", (data) => {
      console.log(data); // TODO: update player list
    });
    return () => {
      socket.off("error");
      socket.off("end");
      socket.off("game-config");
    };
  }, []);

  function startGame() {
    console.log("start game");
    console.log(code);
    const gameConfig = {
      code: code,
      turnOrder: ["Marc", "John", "Jasper", "Jaime", "Daniel"], // TODO: randomize
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
      houses: generateHouses(config),
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

  let players = [
    {
      playerRole: "Viral",
      image: "/pieces/viral-1.png",
      playerName: "Daniel",
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
          <div key={index} className="player">
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

        {playerCount < 5 ? (
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
