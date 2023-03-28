function Player({ name, image, code }: { name: string; image: string; code: number }) {
  return (
    <>
      <h2 className="player-name">{name}</h2>
      <img src={image} className="player-avatar"></img>
      <p>
        Player Code: <br /> {code}
      </p>
    </>
  );
}

export default Player;
