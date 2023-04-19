import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { useEffect, useReducer, useState } from "react";
import { GameConfigActionType, gameConfigReducer } from "../Game/gameConfigReducer";
import player1 from "/pieces/player-1.png";
import player2 from "/pieces/player-2.png";
import player3 from "/pieces/player-3.png";
import player4 from "/pieces/player-4.png";
import viral1 from "/pieces/viral-1.png";
import viral2 from "/pieces/viral-2.png";
import { INITIAL_GAME_CONFIG } from "../Game/gameConfig";
import LongPressButton from "../Game/LongPressButton";

function Result() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const socket = useSocket();

  const [isLoading, setIsLoading] = useState(true);
  const [results, dispatch] = useReducer(gameConfigReducer, INITIAL_GAME_CONFIG);

  useEffect(() => {
    socket.emit("get-results", { code: code });
    socket.on("error", (data) => {
      if (data.action === "goHome") navigate("/", { state: { error: data.message } });
    });
    socket.on("results", (data) => {
      // dispatch({ type: GameConfigActionType.SET_GAME_CONFIG, payload: data });
      setIsLoading(false);
    });

    return () => {
      socket.off("error");
      socket.off("results");
    };
  }, []);

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code: code });
    navigate("/");
  }

  if(isLoading) return <>Loading results...</>;

  return (
    <>
      <h1>Results</h1>
      <div style={{ backgroundColor: "black", padding: 10 }}>
        <fieldset style={{ textAlign: "left" }}>
          <legend>Game Information:</legend>
          <p>Game code: {code}</p>
        </fieldset>
      </div>
      <div style={{ backgroundColor: "black", padding: 10 }}>
        {results.survivors.map((survivor, index) => (
          <div key={index}>
            <fieldset style={{ textAlign: "left" }}>
              <legend>{survivor.name}</legend>
              <p>
                <img src={survivor.image} style={{ height: "20px", width: "20px", display: "inline" }} />
                Has Escaped: {String(survivor.hasEscaped)}
              </p>
              <p>
                <img src={survivor.image} style={{ height: "20px", width: "20px", display: "inline" }} />
                Is Dead: {String(survivor.isDead)}
              </p>
              <p>
                <img src={survivor.image} style={{ height: "20px", width: "20px", display: "inline" }} />
                Number of cures: {survivor.numOfCures}
              </p>
              <p>
                <img src={survivor.image} style={{ height: "20px", width: "20px", display: "inline" }} />
                Houses entered: {survivor.housesEntered}
              </p>
            </fieldset>
          </div>
        ))}
      </div>
      <div style={{ backgroundColor: "black", padding: 10 }}>
        <fieldset style={{ textAlign: "left" }}>
          <legend>{results.viral.name}</legend>
          <p>
            <img src={results.viral.image} style={{ height: "20px", width: "20px", display: "inline" }} />
            Number of Infections: {results.viral.numOfInfections}
          </p>
          <p>
            <img src={results.viral.image} style={{ height: "20px", width: "20px", display: "inline" }} />
            Number of Killings: {results.viral.numOfKillings}
          </p>
          <p>
            <img src={results.viral.image} style={{ height: "20px", width: "20px", display: "inline" }} />
            Skill points: {results.viral.skillPoints}
          </p>
        </fieldset>
        {/* <LongPressButton text="Delete Game" callback={deleteGame} className="h-7" /> */}
        <button onClick={deleteGame}>Delete Game</button>
      </div>
      
    </>
  );
}

export default Result;
