import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { IGame, IHouse, ISurvivor } from "./GameInterface";
import House from "./House";
import { GeneralEvent, SurvivorEvent, ViralEvent } from "./RandomEvent";

function Game() {
  const { code } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  // TODO: refactor
  const [gameConfig, setGameConfig] = useState<IGame | null>(null);
  const [roundCount, setRoundCount] = useState(0);
  const [turnCount, setTurnCount] = useState(0);
  const [playerTurn, setPlayerTurn] = useState("");
  const [currentSurvivor, setCurrentSurvivor] = useState<ISurvivor>();

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
    setGameConfig(() => {
      setRoundCount(data.round);
      setTurnCount(data.turn);
      let newPlayerTurn = data.turnOrder[data.turn];
      setPlayerTurn(newPlayerTurn);
      setCurrentSurvivor(data.survivors.find((survivor) => survivor.name === newPlayerTurn));
      return data;
    });
  }

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code: code });
    navigate("/");
  }

  function getCurrentSurvivor(newPlayerTurn: string = playerTurn) {
    return gameConfig?.survivors.find((survivor) => survivor.name === newPlayerTurn);
  }

  function endTurn() {
    console.log("end turn");
    console.log(turnCount);
    setTurnCount((prevTurnCount) => {
      let newTurnCount = prevTurnCount + 1;
      console.log(newTurnCount);
      let newRoundCount = roundCount;
      let newPlayerTurn = playerTurn;
      if (newTurnCount === gameConfig!.turnOrder.length) {
        setRoundCount((prevRoundCount) => prevRoundCount + 1);
        newTurnCount = 0;
        newPlayerTurn = gameConfig!.turnOrder[0];
      } else {
        newPlayerTurn = gameConfig!.turnOrder[newTurnCount];
      }
      setPlayerTurn(newPlayerTurn);
      setCurrentSurvivor(getCurrentSurvivor(newPlayerTurn));
      socket.emit("next-turn", { code: code, turn: newTurnCount, round: newRoundCount });
      return newTurnCount;
    });
  }

  return (
    <div>
      <h1>Game {roundCount && <>- R{roundCount}</>}</h1>
      {gameConfig && <h1>{playerTurn}'s turn</h1>}
      <div className="flex gap-4">
        <button onClick={() => console.log("infect")}>Infect</button>
        <button onClick={() => console.log("heal")}>Heal</button>
      </div>
      <h2>Item Slots</h2>
      <div className="houses">
        {currentSurvivor?.name === playerTurn &&
          gameConfig!.houses?.map((house: IHouse) => (
            <House key={`${house.id}`} id={house.id} itemCapacity={house.itemCapacity} survivor={currentSurvivor} />
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
