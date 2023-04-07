import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { IHouse } from "../Game/GameInterface";
import "./Lobby.css";

const config = {
  numOfHouses: 17,
  numOfSurvivors: 4,
  totalItemCapacity: 50,
};

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
      turnOrder: ["Carlo", "Jaime", "Jasper", "Daniel", "Sean"], // TODO: randomize
      viral: {
        name: "Sean",
        image: "/pieces/viral-1.png",
      },
      survivors: [
        {
          name: "Carlo",
          image: "/pieces/player-1.png",
          keycardHouse: generateRandomNumber(1, config.numOfHouses),
        },
        {
          name: "Jaime",
          image: "/pieces/player-2.png",
          keycardHouse: generateRandomNumber(1, config.numOfHouses),
        },
        {
          name: "Jasper",
          image: "/pieces/player-3.png",
          keycardHouse: generateRandomNumber(1, config.numOfHouses),
        },
        {
          name: "Daniel",
          image: "/pieces/player-4.png",
          keycardHouse: generateRandomNumber(1, config.numOfHouses),
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
    let availableImages = survivorImages.filter((image) => !usedImages.includes(image)); // survivor icons not yet used

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

  const [availableImages, setAvailableImages] = useState(survivorImages);

  function changeViralImage() {
    let newList = [...playerList];
    newList[0].image == viralImages[0] ? (newList[0].image = viralImages[1]) : (newList[0].image = viralImages[0]);
    setPlayerList(newList);
  }

  function moveImageLeft(index: number) {
    let newList = [...playerList];
    if (index == 0) {
      changeViralImage();
    } else {
      survivorImages.indexOf(newList[index].image) - 1 >= 0
        ? (newList[index].image = survivorImages[survivorImages.indexOf(newList[index].image) - 1])
        : null;
      setPlayerList(newList);
    }
  }

  function moveImageRight(index: number) {
    let newList = [...playerList];
    if (index == 0) {
      changeViralImage();
    } else {
      survivorImages.indexOf(newList[index].image) + 1 < 8
        ? (newList[index].image = survivorImages[survivorImages.indexOf(newList[index].image) + 1])
        : null;
      setPlayerList(newList);
    }
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
              <button className="change-image" onClick={() => moveImageLeft(index)}>
                &#8249;
              </button>
              <img src={player.image} className="player-avatar"></img>
              <button className="change-image" onClick={() => moveImageRight(index)}>
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
