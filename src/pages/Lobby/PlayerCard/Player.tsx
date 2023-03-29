function Player({ playerRole, image, playerName }: { playerRole: string; image: string; playerName: string }) {
  return (
    <div key={playerName}>
      <h2 className="player-role">{playerRole}</h2>
      <div className="image-container">
        <button className="change-image" onClick={() => console.log("move left")}>
          &#8249;
        </button>
        <img src={image} className="player-avatar"></img>
        <button className="change-image" onClick={(e) => console.log("move right")}>
          &#8250;
        </button>
      </div>
      <p className="player-name">{playerName}</p>
    </div>
  );
}

export default Player;
