function Player({ playerRole, image, playerName }: { playerRole: string; image: string; playerName: string }) {
  return (
    <>
      <h2 className="player-role">{playerRole}</h2>
      <img src={image} className="player-avatar"></img>
      <p className="player-name">{playerName}</p>
    </>
  );
}

export default Player;
