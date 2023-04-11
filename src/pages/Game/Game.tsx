import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import "./Game.css";
import { INITIAL_GAME_CONFIG } from "./gameConfig";
import { GameConfigActionType, gameConfigReducer } from "./gameConfigReducer";
import { IHouse, ISurvivor, IViral } from "./gameInterface";
import House from "./House";
import LongPressButton from "./LongPressButton";
import { GeneralEvent, SurvivorEvent, ViralEvent } from "./RandomEvent";

function Game() {
  const { code } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();

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

  // if its round 10, announce keycard locations
  useEffect(() => {
    if (gameConfig.round === 10) {
      let announcement = "Attention!!! Keycard locations of the following survivors: ";
      // for each survivor, announce their keycard with <name> - <keycardHouse>
      gameConfig.survivors.forEach((survivor) => {
        announcement += `${survivor.name} - House ${survivor.keycardHouse}, `;
      });
      const synth = new SpeechSynthesisUtterance(announcement);
      synth.voice = speechSynthesis.getVoices()[0];
      synth.pitch = 2;
      synth.rate = 1.4;
      window.speechSynthesis.speak(synth);
    }
  }, [gameConfig.round]);

  // TODO: useEffect next-turn or logGameConfig when gameConfig.turn changes

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code: code });
    navigate("/");
  }

  function endTurn() {
    console.log("end turn");
    console.log(gameConfig);
    dispatch({ type: GameConfigActionType.END_TURN });
    socket.emit("end-turn", { code: code, turn: gameConfig.turn, round: gameConfig.round });
  }
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
  function survivorInfect() {
    dispatch({ type: GameConfigActionType.SURVIVOR_INFECT, payload: getCurrentPlayer() as ISurvivor });
  }

  function survivorCure() {
    dispatch({ type: GameConfigActionType.SURVIVOR_CURE, payload: getCurrentPlayer() as ISurvivor });
  }

  function survivorEscape() {
    dispatch({ type: GameConfigActionType.SURVIVOR_ESCAPE, payload: getCurrentPlayer() as ISurvivor });
  }

  function survivorDie() {
    dispatch({ type: GameConfigActionType.SURVIVOR_DIE, payload: getCurrentPlayer() as ISurvivor });
  }

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
    // check if game has ended by checking each survivor hasEscaped or isDead then redirect to results page
    if (gameConfig.survivors.every((survivor: ISurvivor) => survivor.hasEscaped || survivor.isDead)) {
      // socket.emit("end", { code: code });
      // navigate(`/results/${code}`);
      console.log("game has ended");
    }
    let survivor = getCurrentPlayer() as ISurvivor;
    if (survivor.hasEscaped || survivor.isDead) dispatch({ type: GameConfigActionType.END_TURN });
    socket.emit("next-turn", { code: code, turn: gameConfig.turn, round: gameConfig.round });
  }

  if (isLoading) return <>Loading game config...</>;

  logGameConfig();
  return (
    <div className="">
      <div>
        <h1>
          Game {code} {gameConfig && <>- R{gameConfig.round}</>}
        </h1>
        {gameConfig && (
          <div className="flex items-center justify-center gap-3">
            <img src={getCurrentPlayer()!.image} alt="Player image" className="w-14" />
            <h1>{getCurrentPlayer()!.name}'s turn</h1>
          </div>
        )}
      </div>
      {isCurrentPlayerSurvivor() && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-4">
            {/* {currentSurvivor?.isInfected && <h2>Infected</h2>}
            <button onClick={handleInfect} disabled={currentSurvivor?.isInfected}>
              Infect
            </button>
            <button onClick={handleCure} disabled={!currentSurvivor?.isInfected}>
              Heal
            </button> */}
          </div>
          <h2>Get Item from Houses</h2>
          <div className="houses">
            {gameConfig.houses.map((house: IHouse) => (
              <House key={`${house.id}`} house={house} survivor={getCurrentPlayer() as ISurvivor} dispatch={dispatch} />
            ))}
          </div>
          <LongPressButton text="Escape" callback={survivorEscape} />
          <SurvivorEvent />
        </div>
      )}
      {!isCurrentPlayerSurvivor() && (
        <>
          <div className="p-4">
            <h2>Infect Players</h2>
            <div className="flex items-center justify-center gap-2">
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
      <div className="flex items-center justify-center gap-40 pt-4">
        <LongPressButton text="End Turn" callback={endTurn} />
        <LongPressButton text="Delete Game" callback={deleteGame} />
      </div>
    </div>
  );
}

export default Game;
