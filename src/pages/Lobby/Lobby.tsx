import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { IPlayer } from "../Game/GameInterface";
import "./Lobby.css";
import player1 from "/pieces/player-1.png";
import player2 from "/pieces/player-2.png";
import player3 from "/pieces/player-3.png";
import player4 from "/pieces/player-4.png";
import player5 from "/pieces/player-5.png";
import player6 from "/pieces/player-6.png";
import player7 from "/pieces/player-7.png";
import player8 from "/pieces/player-8.png";
import viral1 from "/pieces/viral-1.png";
import viral2 from "/pieces/viral-2.png";

function shuffle(array: any[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function Lobby() {
  const { code } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const [error, setError] = useState("");

  const viralImages = [viral1, viral2];
  const survivorImages = [player1, player2, player3, player4, player5, player6, player7, player8];

  const [playerList, setPlayerList] = useState<IPlayer[]>([
    {
      role: "Viral",
      image: "/pieces/viral-1.png",
      name: "Viral",
    },
    {
      role: "Survivor",
      image: "/pieces/player-1.png",
      name: "Survivor 1",
    },
    {
      role: "Survivor",
      image: "/pieces/player-2.png",
      name: "Survivor 2",
    },
  ]);

  useEffect(() => {
    socket.emit("join", { code: code });
    socket.on("error", (data) => {
      if (data.action === "goHome") navigate("/", { state: { error: data.message } });
    });
    socket.on("end", (data) => {
      if (data.hasGameEnded) navigate(`/results/${data.code}`);
    });

    socket.on("started", (game: any) => {
      console.log("game started");
      navigate("/game/" + game.code);
    });
    return () => {
      socket.off("error");
      socket.off("end");
      socket.off("started");
    };
  }, []);

  function addPlayer() {
    let newList = [...playerList];
    let usedImages = newList.map((player) => player.image); // survivor icons that are already used by other players
    let availableImages = survivorImages.filter((image) => !usedImages.includes(image)); // survivor icons not yet used

    if (playerList.length <= 5) {
      // Only 5 total players are allowed (1 - Viral, 4 - Survivors)
      newList.push({
        role: "Survivor",
        image: availableImages[Math.floor(Math.random() * availableImages.length)], // Set a random image not yet used by other survivors
        name: `Survivor ${playerList.length}`,
      });
    }
    setPlayerList(newList); // updates the playerList
  }

  function removePlayer(index: number) {
    let newList = [...playerList];
    newList.splice(index, 1); // Remove the player from the playerList
    setPlayerList(newList);
  }

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

  function startGame() {
    const viral = playerList.find((player) => player.role === "Viral");
    const survivors = playerList.filter((player) => player.role === "Survivor");

    // survivors must have unique names and images
    const survivorNames = survivors.map((survivor) => survivor.name);
    const survivorImages = survivors.map((survivor) => survivor.image);
    if (new Set(survivorNames).size !== survivorNames.length) {
      setError("Survivor names must be unique");
      return;
    }
    if (new Set(survivorImages).size !== survivorImages.length) {
      setError("Survivor images must be unique");
      return;
    }

    const turnOrder = [...shuffle(survivors.map((survivor) => survivor.name)), viral?.name];
    const gameConfig = {
      code: code,
      turnOrder: turnOrder,
      viral: {
        name: viral?.name,
        image: viral?.image,
      },
      survivors: survivors,
    };

    console.log("start game");
    console.log(code);
    socket.emit("start", gameConfig);
  }

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code: code });
    navigate("/");
  }

  return (
    <div className="grid gap-10">
      <h1>
        Lobby - <span className="">{code}</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {playerList.map((player, index) => (
          <div className="player" key={index}>
            {index > 2 ? (
              <button className="remove-player" onClick={() => removePlayer(index)}>
                <p className="button-text">&#10006;</p>
              </button>
            ) : null}
            <h2 className="player-role">{player.role}</h2>
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
              defaultValue={player.name}
              onChange={(e) => (player.name = e.target.value)}
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
        {error ? <p className="text-red-500">{error}</p> : null}
        <div>
          <button className="start-game" onClick={startGame}>
            Start Game
          </button>
          <button className="cancel-game" onClick={deleteGame}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
