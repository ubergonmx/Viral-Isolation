import { Link } from "react-router-dom";
import House from "../../House";

// create a type called House
type House = {
  id: number;
  itemSlots: number;
};

const numOfSurvivors = 4;
var totalItemCapacity = 35;

function getRandomCapacityNum(pool: number): number {
  let randomNum = Math.floor(Math.random() * pool) + 1;
  if (randomNum < totalItemCapacity) {
    totalItemCapacity = totalItemCapacity - randomNum;
    return randomNum;
  } else {
    return totalItemCapacity;
  }
}

// create a list of 17 houses, with 40 item slots spread across them
const houses: House[] = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  //spread the item slots across the houses
  itemSlots: getRandomCapacityNum(numOfSurvivors),
}));

function Home() {
  return (
    <div className="home">
      <h1>Viral Isolation</h1>
      <p>Click on a house to use an item.</p>
      <p>Click on the About link to learn more.</p>
      <h2>Item Slots</h2>
      <Link to="/lobby">Start Game</Link>
      <div className="houses">
        {houses.map((house) => (
          <House key={house.id} id={house.id} itemCapacity={house.itemSlots} />
        ))}
      </div>
    </div>
  );
}

export default Home;
