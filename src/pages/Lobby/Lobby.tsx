import "./Lobby.css";

function Lobby() {
  function addPlayer() {
    console.log("add player");
  }

  return (
    <div className="game-setup">
      <h1>Lobby</h1>
      <div className="flex">
        <div className="viral-player">
          <h2>Viral Player</h2>
        </div>

        <div className="survivor-player">
          <h2>Survivor Player</h2>
        </div>

        <div className="survivor-player">
          <h2>Survivor Player</h2>
        </div>

        <button onClick={addPlayer}>+</button>
      </div>

      <div>
        <button>Start Game</button>
      </div>
    </div>
  );
}

export default Lobby;
