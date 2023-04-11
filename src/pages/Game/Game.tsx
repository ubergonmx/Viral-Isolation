import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import "./Game.css";
import { GameConfigActionType, gameConfigReducer, INITIAL_GAME_CONFIG } from "./gameConfigReducer";
import { IGame, IHouse, ISurvivor, IViral } from "./GameInterface";
import House from "./House";
import LongPressButton from "./LongPressButton";
import { GeneralEvent, SurvivorEvent, ViralEvent } from "./RandomEvent";

function Game() {
  const { code } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  // TODO: refactor
  // const [gameConfig, setGameConfig] = useState<IGame | null>(null);
  // const [roundCount, setRoundCount] = useState(0);
  // const [turnCount, setTurnCount] = useState(0);
  // const [playerTurn, setPlayerTurn] = useState("");
  // const [currentSurvivor, setCurrentSurvivor] = useState<ISurvivor>();
  const [isLoading, setIsLoading] = useState(true);
  const [gameConfig, dispatch] = useReducer(gameConfigReducer, INITIAL_GAME_CONFIG);

  useEffect(() => {
    socket.emit("join", { code: code });
    socket.on("error", (data) => {
      if (data.action === "goHome") navigate("/", { state: { error: data.message } });
    });
    socket.on("end", (data) => {
      if (data.hasGameEnded) navigate(`/results/${data.code}`);
    });
    socket.on("game-config", (data) => {
      console.log("socket on game-config");
      console.log(data);
      dispatch({ type: GameConfigActionType.SET_GAME_CONFIG, payload: data });
      setIsLoading(false);
    });
    return () => {
      socket.off("error");
      socket.off("end");
      socket.off("game-config");
    };
  }, []);

  function initializeGame(data: IGame) {
    // setGameConfig(() => {
    //   setRoundCount(data.round);
    //   setTurnCount(data.turn);
    //   let newPlayerTurn = data.turnOrder[data.turn];
    //   setPlayerTurn(newPlayerTurn);
    //   setCurrentSurvivor(data.survivors.find((survivor) => survivor.name === newPlayerTurn));
    //   return data;
    // });
  }

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code: code });
    navigate("/");
  }

  // function getCurrentSurvivor(newPlayerTurn: string = playerTurn) {
  //   const survivor = gameConfig?.survivors.find((survivor) => survivor.name === newPlayerTurn);
  //   console.log(survivor);
  //   return survivor;
  // }

  function endTurn() {
    console.log("end turn");
    console.log(gameConfig);
    // setTurnCount((prevTurnCount) => {
    //   let newTurnCount = prevTurnCount + 1;
    //   console.log(newTurnCount);
    //   let newRoundCount = roundCount;
    //   let newPlayerTurn = playerTurn;
    //   if (newTurnCount === gameConfig!.turnOrder.length) {
    //     setRoundCount((prevRoundCount) => prevRoundCount + 1);
    //     newTurnCount = 0;
    //     newPlayerTurn = gameConfig!.turnOrder[0];
    //   } else {
    //     newPlayerTurn = gameConfig!.turnOrder[newTurnCount];
    //   }
    //   setPlayerTurn(newPlayerTurn);
    //   setCurrentSurvivor(getCurrentSurvivor(newPlayerTurn));
    //   socket.emit("next-turn", { code: code, turn: newTurnCount, round: newRoundCount });
    //   return newTurnCount;
    // });
    dispatch({ type: GameConfigActionType.END_TURN });
  }

  // function handleInfect() {
  //   socket.emit("infectSurvivor", { code: code, survivor: currentSurvivor });
  //   setGameConfig({
  //     ...gameConfig!,
  //     survivors: gameConfig!.survivors.map((survivor) => {
  //       if (survivor.name === currentSurvivor?.name) survivor.isInfected = true;
  //       return survivor;
  //     }),
  //   });
  // }

  // function handleInfectByViral(survivorName: string) {
  //   const survivor = gameConfig?.survivors.find((survivor) => survivor.name === survivorName);
  //   console.log(survivorName);
  //   if (!survivor) return;
  //   socket.emit("infectSurvivor", { code: code, survivor: survivor });
  //   setGameConfig({
  //     ...gameConfig!,
  //     survivors: gameConfig!.survivors.map((survivor) => {
  //       if (survivor.name === survivor?.name) survivor.isInfected = true;
  //       return survivor;
  //     }),
  //   });
  // }

  // function handleCure() {
  //   socket.emit("cureSurvivor", { code: code, survivor: currentSurvivor });
  //   setGameConfig((prevGameConfig) => {
  //     let newGameConfig = { ...prevGameConfig! };
  //     newGameConfig.survivors = newGameConfig.survivors.map((survivor) => {
  //       if (survivor.name === currentSurvivor?.name) {
  //         survivor.isInfected = false;
  //       }
  //       return survivor;
  //     });
  //     return newGameConfig;
  //   });
  // }

  function isSurvivorInfected(survivorName: string) {
    return gameConfig.survivors.find((survivor: ISurvivor) => survivor.name === survivorName)?.isInfected;
  }

  function isCurrentPlayerSurvivor() {
    return gameConfig.turnOrder[gameConfig.turn] !== gameConfig.viral.name;
  }

  function getCurrentPlayer(): ISurvivor | IViral | undefined {
    const { turn, turnOrder, viral, survivors } = gameConfig;
    if (turnOrder[turn] === viral.name) return viral;
    return survivors.find((survivor: ISurvivor) => survivor.name === turnOrder[turn]);
  }

  function logGameConfig() {
    console.log("log game config");
    console.log(gameConfig);
    return <></>;
  }

  if (isLoading) return <>Loading game config...</>;

  return (
    <div>
      {logGameConfig()}
      <h1>
        Game {code} {gameConfig && <>- R{gameConfig.round}</>}
      </h1>
      {gameConfig && (
        <div className="flex items-center justify-center gap-3">
          <img src={getCurrentPlayer()!.image} alt="Player image" className="w-14" />
          <h1>{getCurrentPlayer()!.name}'s turn</h1>
        </div>
      )}
      {isCurrentPlayerSurvivor() && (
        <>
          <div className="flex gap-4">
            {/* {currentSurvivor?.isInfected && <h2>Infected</h2>}
            <button onClick={handleInfect} disabled={currentSurvivor?.isInfected}>
              Infect
            </button>
            <button onClick={handleCure} disabled={!currentSurvivor?.isInfected}>
              Heal
            </button> */}
          </div>
          <h2>Item Slots</h2>
          <div className="houses">
            {gameConfig.houses.map((house: IHouse) => (
              <House key={`${house.id}`} house={house} survivor={getCurrentPlayer() as ISurvivor} dispatch={dispatch} />
            ))}
          </div>
          <SurvivorEvent />
        </>
      )}
      {!isCurrentPlayerSurvivor() && (
        <>
          <div className="p-4">
            <h2>Infect Players</h2>
            <div className="flex gap-2">
              {gameConfig.survivors.map((survivor: ISurvivor) =>
                !survivor.isInfected ? (
                  <div key={survivor.name}>
                    <button>{survivor.name}</button>
                  </div>
                ) : null,
              )}
            </div>
          </div>
          <ViralEvent />
        </>
      )}
      <GeneralEvent />
      <div className="flex gap-40 pt-4">
        <LongPressButton text="End Turn" callback={endTurn} />
        <LongPressButton text="Delete Game" callback={deleteGame} />
      </div>
    </div>
  );
}

export default Game;
