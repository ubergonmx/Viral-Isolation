import { useParams } from "react-router-dom";

function Game() {
  const { id } = useParams();
  return (
    <div>
      <h1>Game</h1>
    </div>
  );
}

export default Game;
