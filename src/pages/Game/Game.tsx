import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import Result, { Viral, Survivor, GameResult } from "../Result/Result";
import { GeneralEvent, SurvivorEvent, ViralEvent } from "./RandomEvent";

//import House from "../Game/House";
// create a type called House
// type House = {
//   id: number;
//   itemSlots: number;
// };

// const numOfSurvivors = 4;
// var totalItemCapacity = 35;

// function getRandomCapacityNum(pool: number): number {
//   let randomNum = Math.floor(Math.random() * pool) + 1;
//   if (randomNum < totalItemCapacity) {
//     totalItemCapacity = totalItemCapacity - randomNum;
//     return randomNum;
//   } else {
//     return totalItemCapacity;
//   }
// }

// // create a list of 17 houses, with 40 item slots spread across them
// const houses: House[] = Array.from({ length: 17 }, (_, i) => ({
//   id: i + 1,
//   //spread the item slots across the houses
//   itemSlots: getRandomCapacityNum(numOfSurvivors),
// }));

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
  const { code } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    socket.emit("join", { code: code });
    socket.on("error", (data) => {
      if (data.action === "goHome") navigate("/", { state: { error: data.message } });
    });
    return () => {
      socket.off("error");
    };
  }, []);

  function deleteGame() {
    console.log("delete game");
    socket.emit("delete", { code: code });
    navigate("/");
  }

  return (
    <div>
      <h1>Game</h1>
      <Result results={results} />
      {/* <button onClick={() => navigate("/game/lobby")}>Back to Lobby</button> */}
      <button onClick={deleteGame}>Delete Game</button>

      {/*
      <h2>Item Slots</h2>
      <div className="houses">
        {houses.map((house) => (
          <House key={house.id} id={house.id} itemCapacity={house.itemSlots} />
        ))}
      </div> */}

      <GeneralEvent />
      <ViralEvent />
      <SurvivorEvent />
    </div>
  );
}

export default Game;
