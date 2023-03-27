import { useParams } from "react-router-dom";
import Results, { Viral, Survivor, GameResult } from "./Results";

const aaron: Viral = {
  name: "Aaron",
  skill: 3,
  noOfInfections: 2,
  noOfKillings: 1,
};

const marc: Survivor = {
  name: "Marc",
  hp: 1,
  hasEscaped: true,
  isDead: false,
};
const john: Survivor = {
  name: "John",
  hp: 0,
  hasEscaped: false,
  isDead: true,
};

const results: GameResult = {
  id: 1021,
  survivor: [marc, john],
  viral: aaron,
  gameTime: 3600,
};

function Game() {
  const { id } = useParams();
  return (
    <div>
      <h1>Game</h1>
      <Results results={results} />
    </div>
  );
}

export default Game;
