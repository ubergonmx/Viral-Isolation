function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is a game that requires 3-5 players.</p>
      <div className="flex max-w-2xl flex-col gap-2.5">
        <div className="rounded border border-solid border-white p-2.5">
          <h1>Map Guide</h1>
          <ol className="text-justify">
            <li className="list-inside list-decimal">Nodes</li>
            <div>
              <ul className="block">
                <li className="list-inside list-disc">
                  these are the circles where you place character pieces, traps, and obstacles. these are the circles
                  where you place character pieces, traps, and obstacles.
                </li>
                <li className="list-inside list-disc">
                  an adjacent node is one that is right next to the player’s current node.
                </li>
                <li className="list-inside list-disc">houses are special and as such traps cannot be placed there.</li>
                <li className="list-inside list-disc">elevation is indicated by the darker hue of the bottom floor.</li>
              </ul>
              <img className="h-5 w-5" src="/pieces/player-1.png" />
              <img className="h-5 w-5" src="/pieces/player-1.png" />
              <img className="h-5 w-5" src="/pieces/player-1.png" />
              <img className="h-5 w-5" src="/pieces/player-1.png" />
            </div>
            <li className="list-inside list-decimal">Shortcuts</li>
            <div>
              <ul className="block">
                <li className="list-inside list-disc">these are not nodes but pathways.</li>
                <li className="list-inside list-disc">a player cannot stand on them but only cross them.</li>
                <li className="list-inside list-disc">nodes separated by shortcuts are not considered adjacent.</li>
                <li className="list-inside list-disc">default viral cannot make use of ladder, ziplines, and boats.</li>
              </ul>
              <img className="h-5 w-5" src="/pieces/player-1.png" />
              <img className="h-5 w-5" src="/pieces/player-1.png" />
              <img className="h-5 w-5" src="/pieces/player-1.png" />
              <img className="h-5 w-5" src="/pieces/player-1.png" />
              <img className="h-5 w-5" src="/pieces/player-1.png" />
            </div>
          </ol>
        </div>
        <div className="rounded border border-solid border-white p-2.5">
          <h1>Play Guide</h1>
          <ol className="text-justify">
            <li className="list-inside list-decimal">Player Movement</li>
            <li className="list-inside list-decimal">Game Setup</li>
            <li className="list-inside list-decimal">Survivor Gameplay</li>
            <li className="list-inside list-decimal">Viral Gameplay</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default About;
