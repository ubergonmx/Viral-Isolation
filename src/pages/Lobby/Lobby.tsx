import "./Lobby.css";
import Player from "./PlayerCard/Player";
import { useState, useEffect } from "react";

function Lobby() {
  const players = [
    // temporary
    {
      name: "Viral Player 1",
      image: "/src/assets/viral-temporary-pic.jpg",
      code: 123456,
    },
    {
      name: "Survivor Player 1",
      image: "/src/assets/survivor-temporary-pic.png",
      code: 123457,
    },
    {
      name: "Survivor Player 2",
      image: "/src/assets/survivor-temporary-pic.png",
      code: 123458,
    },
    {
      name: "Survivor Player 3",
      image: "/src/assets/survivor-temporary-pic.png",
      code: 123459,
    },
    {
      name: "Survivor Player 4",
      image: "/src/assets/survivor-temporary-pic.png",
      code: 123460,
    },
  ];

  function addPlayer() {
    console.log("Hello");
  }

  return (
    <div className="game-setup">
      <h1>Lobby</h1>
      <div className="flex">
        {players.map((player) => (
          <Player key={player.code} name={player.name} image={player.image} code={player.code} />
        ))}

        <button className="add-button" onClick={addPlayer}>
          &#x2b;
        </button>
      </div>

      <div>
        <button>Start Game</button>
      </div>
    </div>
  );
}

export default Lobby;
