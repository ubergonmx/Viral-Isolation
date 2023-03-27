export type Viral = {
  name: string;
  skill: number;
  noOfInfections: number;
  noOfKillings: number;
};
export type Survivor = {
  name: string;
  hp: number;
  hasEscaped: boolean;
  isDead: boolean;
};

export type GameResult = {
  id: number;
  survivor: Survivor[];
  viral: Viral;
  gameTime: number;
};

function Results({ results }: { results: GameResult }) {
  return (
    <>
      <h1>Results</h1>
      <div>
        {results.survivor.map((survivor, index) => (
          <div key={index}>
            <p>display details</p>
          </div>
        ))}
      </div>
      <div>{/* viral */}</div>
    </>
  );
}

export default Results;
