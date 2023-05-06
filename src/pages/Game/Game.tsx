import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import "./Game.css";
import { EventConfig, GameStatus, INITIAL_GAME_CONFIG, ViralConfig } from "./gameConfig";
import { GameConfigActionType, gameConfigReducer } from "./gameConfigReducer";
import { IHouse, ISurvivor, IViral } from "./gameInterface";
import House from "./House";
import LongPressButton from "./LongPressButton";
import { GeneralEvent, SurvivorEvent, ViralEvent } from "./RandomEvent";
import alarm from "/sfx/alarm.mp3";

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

  // if its round 4,7,10, announce keycard locations
  useEffect(() => {
    let roundAnnounce = 10;
    switch (gameConfig.survivors.length){
      case 2:
        roundAnnounce = EventConfig.KEYCARD_2S_ANNOUNCEMENT_ROUND;
        break;
      case 3:
        roundAnnounce = EventConfig.KEYCARD_3S_ANNOUNCEMENT_ROUND;
        break;
      case 4:
        roundAnnounce = EventConfig.KEYCARD_4S_ANNOUNCEMENT_ROUND;
        break;
      default:
        break;
    }

    if (gameConfig.round === roundAnnounce) {
      let announcement = "Attention!!! Keycard locations of the following survivors: ";
      let keycardLocations = "";
      // for each survivor, announce their keycard with <name> - <keycardHouse>
      gameConfig.survivors.forEach((survivor, index, array) => {
        keycardLocations += `${survivor.name} - House ${survivor.keycardHouse}`;
        keycardLocations += index !== array.length - 1 ? ", " : ".";
      });
      
      announcement = announcement.concat(keycardLocations) + " I repeat, " + keycardLocations;

      const synth = new SpeechSynthesisUtterance(announcement);
      // synth.voice = speechSynthesis.getVoices()[0];
      for (const voice of speechSynthesis.getVoices()) {
        //select default voice
        if (voice.default) {
          synth.voice = voice;
        }
      }
      synth.pitch = 1.1;
      synth.rate = 1.1;
      let audio = new Audio(alarm)
      audio.volume = 0.1;
      audio.play();
      window.speechSynthesis.speak(synth);
    }
  }, [gameConfig.round]);

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code: code });
    navigate("/");
  }

  function endTurn() {
    console.log("end turn");
    console.log(gameConfig);
    dispatch({ type: GameConfigActionType.END_TURN });
    socket.emit("end-turn", {
      code: code,
      turn: gameConfig.turn,
      round: gameConfig.round,
      turnSkillPoint: ViralConfig.TURN_SKILLPOINT,
    });
  }

  function survivorInfect(survivorName?: string) {
    const data = survivorName
      ? gameConfig.survivors.find((survivor: ISurvivor) => survivor.name === survivorName)
      : (getCurrentPlayer() as ISurvivor);
    dispatch({ type: GameConfigActionType.SURVIVOR_INFECT, payload: data });
    socket.emit("survivor-infect", { code: code, survivor: data, infectSkillPoint: ViralConfig.INFECT_SKILLPOINT });
  }
  
  function survivorKill(survivorName?: string) {
    const data = survivorName
      ? gameConfig.survivors.find((survivor: ISurvivor) => survivor.name === survivorName)
      : (getCurrentPlayer() as ISurvivor);
    dispatch({ type: GameConfigActionType.SURVIVOR_DIE, payload: data });
    socket.emit("survivor-kill", { code: code, survivor: data });
  }
  
  // TODO: add immune system skill point?
  function survivorCure(survivorName: string) {
    const survivor = getCurrentPlayer() as ISurvivor;
    dispatch({
      type: GameConfigActionType.SURVIVOR_CURE,
      payload: { survivorCurer: survivor, survivorCured: survivorName },
    });
    socket.emit("survivor-cure", { code: code, survivor: survivor, survivorCured: survivorName });
  }

  // TODO: bug fix in escape, not working after reloading
  function survivorEscape() {
    const survivor = getCurrentPlayer() as ISurvivor;
    dispatch({ type: GameConfigActionType.SURVIVOR_ESCAPE, payload: survivor });
    socket.emit("survivor-escape", { code: code, survivor: survivor });
  }

  function isSurvivorInfected() {
    return (getCurrentPlayer() as ISurvivor).isInfected;
  }

  function isCurrentPlayerSurvivor() {
    return gameConfig.turnOrder[gameConfig.turn] !== gameConfig.viral.name;
  }

  function getCurrentSurvivorImage() {
    const survivor = getCurrentPlayer() as ISurvivor;
    const imageSplit = survivor.image.split("/");
    imageSplit[2] = "infected-" + imageSplit[2];
    const infectedImage = imageSplit.join("/");
    return survivor.isInfected ? infectedImage : survivor.image;
  }

  function getCurrentPlayer(): ISurvivor | IViral | undefined {
    const { turn, turnOrder, viral, survivors } = gameConfig;
    if (turnOrder[turn] === viral.name) return viral;
    return survivors.find((survivor: ISurvivor) => survivor.name === turnOrder[turn]);
  }

  function manageGame() {
    console.log("log game config");
    console.log(gameConfig);
    // check if game has ended by checking each survivor hasEscaped or isDead then redirect to results page
    if (gameConfig.status === GameStatus.ONGOING &&
      gameConfig.survivors.every((survivor: ISurvivor) => survivor.hasEscaped || survivor.isDead || survivor.isInfected)
    ) {
      dispatch({ type: GameConfigActionType.END_GAME });
      socket.emit("game-end", { code: code });
      console.log("game has ended");
      navigate(`/results/${code}`);
    }
    let survivor = getCurrentPlayer() as ISurvivor;
    if (survivor.hasEscaped || survivor.isDead) dispatch({ type: GameConfigActionType.END_TURN });
    socket.emit("next-turn", { code: code, turn: gameConfig.turn, round: gameConfig.round });
  }

  if (isLoading) return <>Loading game config...</>;

  manageGame();
  return (
    <div className="">
      <div>
        <h1>
          Game {code} {gameConfig && <>- R{gameConfig.round}</>}
        </h1>

        <div className="flex flex-wrap justify-center gap-2 pb-5">
          <LongPressButton text="End Turn" callback={endTurn} className="h-7" />
          {gameConfig &&
            gameConfig.turnOrder.map((turn: string, index: number) => {
              let player, survivorColor;
              if (gameConfig.survivors.some(s => s.name === turn)) {
                player = gameConfig.survivors.find((s:ISurvivor) => s.name === turn);
                if(player){
                  survivorColor = player.isDead ? "bg-red-900 text-gray-400" : player.hasEscaped ? "bg-gray-700 text-gray-400" : "bg-gray-500";
                }
              }
              return (
                <div
                  key={index}
                  className={`${
                    index === gameConfig.turn ? "bg-green-500" : (player && (player.hasEscaped || player.isDead)) ? survivorColor: "bg-gray-500"
                  } flex h-7 items-center rounded-md p-2 text-sm`}
                >
                  {turn}
                </div>
              )
            })}
          <LongPressButton text="Delete Game" callback={deleteGame} className="h-7" />
        </div>
        {gameConfig && (
          <div className="flex items-center justify-center gap-3">
            <img
              src={isCurrentPlayerSurvivor() ? getCurrentSurvivorImage() : getCurrentPlayer()!.image}
              alt="Player image"
              className="w-14"
            />
            <h1>{getCurrentPlayer()!.name}'s turn</h1>
          </div>
        )}
      </div>
      {isCurrentPlayerSurvivor() && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-4 pb-5">
            <LongPressButton text="Infect" callback={survivorInfect} disabled={isSurvivorInfected()} />
            {!isSurvivorInfected() && (
              <div className="flex flex-col gap-2">
                {!(getCurrentPlayer() as ISurvivor).isInfected &&
                  gameConfig.survivors
                    .filter((survivor: ISurvivor) => survivor.name !== (getCurrentPlayer() as ISurvivor).name)
                    .map((survivor: ISurvivor) => (
                      <LongPressButton
                        key={survivor.name}
                        text={`Cure ${survivor.name}`}
                        callback={() => survivorCure(survivor.name)}
                        disabled={!survivor.isInfected && !survivor.isDead}
                      />
                    ))}
              </div>
            )}
          </div>
          {!isSurvivorInfected() && (
            <>
              <h2>Get Item from Houses</h2>
              <div className="houses pb-5">
                {gameConfig.houses.map((house: IHouse) => (
                  <House
                    key={`${house.id}`}
                    house={house}
                    survivor={getCurrentPlayer() as ISurvivor}
                    dispatch={dispatch}
                  />
                ))}
              </div>
              <LongPressButton text="Escape" callback={survivorEscape} />
            </>
          )}
          <SurvivorEvent />
        </div>
      )}
      {!isCurrentPlayerSurvivor() && (
        <>
          <div className="p-4">
            {!gameConfig.viral.skill.apex ? (
              <>
                <h2>Infect Survivors</h2>
                <div className="flex items-center justify-center gap-2 pb-5">
                  {gameConfig.survivors.map((survivor: ISurvivor) =>
                    !survivor.isInfected && !survivor.isDead && !survivor.hasEscaped ? (
                      <LongPressButton
                        key={survivor.name}
                        text={survivor.name}
                        callback={() => survivorInfect(survivor.name)}
                      />
                    ) : null,
                  )}
                </div>
              </>
            ) : (
              <>
                <h2>Kill Survivors</h2>
                <div className="flex items-center justify-center gap-2 pb-5">
                  {gameConfig.survivors.map((survivor: ISurvivor) =>
                    !survivor.isDead && !survivor.hasEscaped ? (
                      <LongPressButton
                        key={survivor.name}
                        text={survivor.name}
                        callback={() => survivorKill(survivor.name)}
                      />
                    ) : null,
                  )}
                </div>
              </>
            )}
            <h2>Skill points: {gameConfig.viral.skillPoints}</h2>
            <div className="grid grid-cols-2 divide-x px-4">
              {/* TODO: refactor this monstrosity 
                [ ] add a socket.emit to the skill callback
                [ ] add a skill tree component that takes in an array of skills and renders them
                [ ] add a skill component that takes in a skill and renders it
                [ ] add a skill type that has a name, description, cost, and callback
                [ ] add a skill tree type that has a name, description, and array of skills
              */}
              <div className="grid items-center justify-center gap-2">
                <LongPressButton
                  text={gameConfig.viral.skill.mindsEye ? "Mind's Eye ✓" : "Mind's Eye"}
                  callback={() => 
                    { 
                      dispatch({ type: GameConfigActionType.VIRAL_SKILL_MINDSEYE })
                      socket.emit("viral-skill", { code: code, skill: "mindsEye", skillPoints: gameConfig.viral.skillPoints, pointsRequired: ViralConfig.MINDSEYE_COST })
                    }
                  }
                  disabled={gameConfig.viral.skill.mindsEye || gameConfig.viral.skillPoints < ViralConfig.MINDSEYE_COST}
                />
                <LongPressButton
                  text={gameConfig.viral.skill.tank ? "Tank ✓" : "Tank"}
                  callback={() => 
                    {
                      dispatch({ type: GameConfigActionType.VIRAL_SKILL_TANK })
                      socket.emit("viral-skill", { code: code, skill: "tank", skillPoints: gameConfig.viral.skillPoints, pointsRequired: ViralConfig.TANK_COST })
                    }
                  }
                  disabled={
                    !gameConfig.viral.skill.mindsEye ||
                    gameConfig.viral.skill.tank ||
                    gameConfig.viral.skillPoints < ViralConfig.TANK_COST
                  }
                />
                <LongPressButton
                  text={gameConfig.viral.skill.onslaught ? "Onslaught ✓" : "Onslaught"}
                  callback={() => 
                    {
                      dispatch({ type: GameConfigActionType.VIRAL_SKILL_ONSLAUGHT })  
                      socket.emit("viral-skill", { code: code, skill: "onslaught", skillPoints: gameConfig.viral.skillPoints, pointsRequired: ViralConfig.ONSLAUGHT_COST })
                    }
                  }
                  disabled={
                    !gameConfig.viral.skill.tank ||
                    gameConfig.viral.skill.onslaught ||
                    gameConfig.viral.skillPoints < ViralConfig.ONSLAUGHT_COST
                  }
                />
              </div>
              <div className="grid items-center justify-center gap-2">
                <LongPressButton
                  text={gameConfig.viral.skill.pathfinder ? "Pathfinder ✓" : "Pathfinder"}
                  callback={() => 
                    { 
                      dispatch({ type: GameConfigActionType.VIRAL_SKILL_PATHFINDER })
                      socket.emit("viral-skill", { code: code, skill: "pathfinder", skillPoints: gameConfig.viral.skillPoints, pointsRequired: ViralConfig.PATHFINDER_COST })
                    }
                  }
                  disabled={gameConfig.viral.skill.pathfinder || gameConfig.viral.skillPoints < ViralConfig.PATHFINDER_COST}
                />
                <LongPressButton
                  text={gameConfig.viral.skill.acidReflux ? "Acid Reflux ✓" : "Acid Reflux"}
                  callback={() => 
                    { 
                      dispatch({ type: GameConfigActionType.VIRAL_SKILL_ACIDREFLUX })
                      socket.emit("viral-skill", { code: code, skill: "acidReflux", skillPoints: gameConfig.viral.skillPoints, pointsRequired: ViralConfig.ACIDREFLUX_COST })
                    }
                  }
                  disabled={
                    !gameConfig.viral.skill.pathfinder ||
                    gameConfig.viral.skill.acidReflux ||
                    gameConfig.viral.skillPoints < ViralConfig.ACIDREFLUX_COST
                  }
                />
                <LongPressButton
                  text={gameConfig.viral.skill.agility ? "Agility ✓" : "Agility"}
                  callback={() => 
                    { 
                      dispatch({ type: GameConfigActionType.VIRAL_SKILL_AGILITY })
                      socket.emit("viral-skill", { code: code, skill: "agility", skillPoints: gameConfig.viral.skillPoints, pointsRequired: ViralConfig.AGILITY_COST})
                    }
                  }
                  disabled={
                    !gameConfig.viral.skill.acidReflux ||
                    gameConfig.viral.skill.agility ||
                    gameConfig.viral.skillPoints < ViralConfig.AGILITY_COST
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <LongPressButton
                text={gameConfig.viral.skill.apex ? "Apex ✓" : "Apex"}
                callback={() => 
                  { 
                    dispatch({ type: GameConfigActionType.VIRAL_SKILL_APEX })
                    socket.emit("viral-skill", { code: code, skill: "apex", skillPoints: gameConfig.viral.skillPoints, pointsRequired: ViralConfig.APEX_COST })
                  }
                }
                disabled={
                  !gameConfig.viral.skill.acidReflux ||
                  !gameConfig.viral.skill.agility ||
                  !gameConfig.viral.skill.tank ||
                  !gameConfig.viral.skill.mindsEye ||
                  !gameConfig.viral.skill.pathfinder ||
                  !gameConfig.viral.skill.onslaught ||
                  gameConfig.viral.skillPoints < ViralConfig.APEX_COST
                }
              />
            </div>
          </div>
          <ViralEvent />
        </>
      )}
      <GeneralEvent />
    </div>
  );
}

export default Game;
