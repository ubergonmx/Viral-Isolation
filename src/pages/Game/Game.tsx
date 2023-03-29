import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { GeneralEvent, SurvivorEvent, ViralEvent } from "./RandomEvent";
import { IGame, IHouse } from "./GameInterface";
import House from "./House";

function Game() {
  const { code } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const [gameConfig, setGameConfig] = useState<IGame | null>(null);
  const [roundCount, setRoundCount] = useState(0);
  const [turnCount, setTurnCount] = useState(0);
  const [playerTurn, setPlayerTurn] = useState("");

  useEffect(() => {
    socket.emit("join", { code: code });
    socket.on("error", (data) => {
      if (data.action === "goHome") navigate("/", { state: { error: data.message } });
    });
    socket.on("end", (data) => {
      if (data.hasGameEnded) navigate(`/results/${data.code}`);
    });
    socket.on("game-config", (data) => {
      initializeGame(data);
    });
    return () => {
      socket.off("error");
      socket.off("end");
      socket.off("game-config");
    };
  }, []);

  function initializeGame(data: IGame) {
    setGameConfig(data);
    setRoundCount(data.round);
    setTurnCount(data.turn);
    setPlayerTurn(data.turnOrder[data.turn]);
  }

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code: code });
    navigate("/");
  }

  function currentSurvivor() {
    return gameConfig?.survivors.find((survivor) => survivor.name === playerTurn);
  }

  function endTurn() {
    if (turnCount === gameConfig!.turnOrder.length - 1) {
      setTurnCount(0);
      setRoundCount(roundCount + 1);
    } else setTurnCount(turnCount + 1);
    setPlayerTurn(gameConfig!.turnOrder[turnCount]);
    socket.emit("next-turn", { code: code, turn: turnCount, round: roundCount });
  }

  return (
    <div>
      <h1>Game {roundCount && <>- R{roundCount}</>}</h1>
      {gameConfig && <h1>{playerTurn}'s turn</h1>}
      <h2>Item Slots</h2>
      <div className="houses">
        {gameConfig &&
          gameConfig.houses?.map((house: IHouse) => (
            <House key={house.id} id={house.id} itemCapacity={house.itemCapacity} survivor={undefined} />
          ))}
      </div>

      <GeneralEvent />
      <ViralEvent />
      <SurvivorEvent />

      <button onClick={endTurn}>End Turn</button>
      <button onClick={deleteGame}>Delete Game</button>
    </div>
  );
}

export default Game;
