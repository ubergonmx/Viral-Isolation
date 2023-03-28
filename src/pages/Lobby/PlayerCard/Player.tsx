function Player({ name, image, code }: { name: string; image: string; code: number }) {
    return (
        <div className="player">
          <h2>{name}</h2>
          <img src={image} className="player-avatar"></img>
          <p>
            Player Code: <br /> {code}
          </p>
        </div>
    );
}

export default Player;
