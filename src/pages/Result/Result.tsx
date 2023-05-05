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
  const [result, dispatch] = useReducer(gameConfigReducer, INITIAL_GAME_CONFIG);
  
  useEffect(() => {
    socket.emit("get-result", { code: code });
    socket.on("error", (data) => {
      if (data.action === "goHome") navigate("/", { state: { error: data.message } });
    });
    socket.on("result", (data) => {
      dispatch({ type: GameConfigActionType.SET_GAME_CONFIG, payload: data });
      setIsLoading(false);
    });

    return () => {
      socket.off("error");
      socket.off("result");
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
          <legend></legend>
          <p>Game code: {code}</p>
        </fieldset>
      </div>
      <div style={{ backgroundColor: "black", padding: 10 }}>
        {result.survivors.map((survivor, index) => (
          <div key={index}>
            <fieldset style={{ textAlign: "left" }}>
              <legend><img src={survivor.image} style={{ height: "20px", width: "20px", display: "inline" }} /> {survivor.name}</legend>
              <p>
                
                Has Escaped: {String(survivor.hasEscaped)}
              </p>
              <p>
                
                Is Dead: {String(survivor.isDead)}
              </p>
              <p>
                
                Number of cures: {survivor.numOfCures}
              </p>
              <p>
                
                Houses entered: {survivor.housesEntered.join(", ")}
              </p>
            </fieldset>
          </div>
        ))}
      </div>
      <div style={{ backgroundColor: "black", padding: 10 }}>
        <fieldset style={{ textAlign: "left" }}>
          <legend><img src={result.viral.image} style={{ height: "20px", width: "20px", display: "inline" }} />{result.viral.name}</legend>
          <p>
            
            Number of Infections: {result.viral.numOfInfections}
          </p>
          <p>
            
            Number of Killings: {result.viral.numOfKillings}
          </p>
          <p>
            
            Skill points: {result.viral.skillPoints}
          </p>
        </fieldset>
        {/* <LongPressButton text="Delete Game" callback={deleteGame} className="h-7" /> */}
        <button onClick={deleteGame}>Delete Game</button>
      </div>
      
    </>
  );
}

export default Result;
