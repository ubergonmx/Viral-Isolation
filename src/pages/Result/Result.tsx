import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { useEffect, useReducer } from "react";
import { GameConfigActionType, gameConfigReducer } from "../Game/gameConfigReducer";
import { INITIAL_GAME_CONFIG } from "../Game/gameConfig";


function Result() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const socket = useSocket();

  const [results, dispatch] = useReducer(gameConfigReducer, INITIAL_GAME_CONFIG);

  useEffect(() => {
    socket.emit("get-results", { code: code });
    socket.on("error", (data) => {
      if (data.action === "goHome") navigate("/", { state: { error: data.message } });
    });
    socket.on("results", (data) => {
      dispatch({ type: GameConfigActionType.SET_GAME_CONFIG, payload: data });
    });

    // return () => {
    //   socket.off("error");
    //   socket.off("results");
    // }
  }, []);

  if(!results) return <>Loading results...</>;

  return (
    <>
      <h1>Results</h1>
      <fieldset style={{ textAlign: "left", backgroundColor: "yellow" }}>
        <legend>Game Information:</legend>
        <p>Game code: {code}</p>
      </fieldset>
      <div>
        {results.survivors.map((survivor, index) => (
          <div key={index}>
            <fieldset style={{ textAlign: "left", backgroundColor: "green" }}>
              <legend>{survivor.name}</legend>
              <p>Has Escaped: {String(survivor.hasEscaped)}</p>
              <p>Is Dead: {String(survivor.isDead)}</p>
              <p>Number of cures: {survivor.numOfCures}</p>
              <p>Houses entered: {survivor.housesEntered}</p>
            </fieldset>
          </div>
        ))}
      </div>
      <div>
        <fieldset style={{ textAlign: "left", backgroundColor: "red" }}>
          <legend>{results.viral.name}</legend>
          <p>Number of Infections: {results.viral.numOfInfections}</p>
          <p>Number of Killings: {results.viral.numOfKillings}</p>
          <p>Skill points: {results.viral.skillPoints}</p>
        </fieldset>
      </div>
    </>
  );
}

export default Result;
