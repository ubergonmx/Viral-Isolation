import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { useEffect } from "react";


function Result() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    socket.emit("join", { code: code });
    socket.on("error", (data) => {
    });
  }, []);

  return (
    <>
      {/* <h1>Results</h1>
      <fieldset style={{ textAlign: "left", backgroundColor: "yellow" }}>
        <legend>Game Information:</legend>
        <p>Game ID: {results.id}</p>
      </fieldset>
      <div>
        {results.survivor.map((survivor, index) => (
          <div key={index}>
            <fieldset style={{ textAlign: "left", backgroundColor: "green" }}>
              <legend>{survivor.name}</legend>
              <p>HP: {survivor.hp}</p>
              <p>Has Escaped: {String(survivor.hasEscaped)}</p>
              <p>Is Dead: {String(survivor.isDead)}</p>
            </fieldset>
          </div>
        ))}
      </div>
      <div>
        <fieldset style={{ textAlign: "left", backgroundColor: "red" }}>
          <legend>{results.viral.name}</legend>
          <p>Skill: {results.viral.skill}</p>
          <p>Number of Infections: {results.viral.noOfInfections}</p>
          <p>Number of Killings: {results.viral.noOfKillings}</p>
        </fieldset>
      </div> */}
    </>
  );
}

export default Result;
