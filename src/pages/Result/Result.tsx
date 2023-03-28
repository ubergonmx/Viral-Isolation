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

function Result({ results }: { results: GameResult }) {
  return (
    <>
      <h1>Results</h1>
      <fieldset style={{ textAlign: "left", backgroundColor: "yellow" }}>
        <legend>Game Information:</legend>
        <p>Game ID: {results.id}</p>
        <p>Game Time: {results.gameTime}</p>
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
      </div>
    </>
  );
}

export default Result;
