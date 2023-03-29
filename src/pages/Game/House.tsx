import { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { ISurvivor } from "./GameInterface";
import { useParams } from "react-router-dom";

function House({ survivor, id, itemCapacity }: { survivor: ISurvivor | undefined; id: number; itemCapacity: number }) {
  const [itemsRemaining, setItemsRemaining] = useState(itemCapacity);
  const [display, setDisplay] = useState("");
  const [entered, setEntered] = useState(false);
  const socket = useSocket();
  const { code } = useParams();

  // useEffect(() => {
  //   function receiveItem(receivedId: number, item: string) {
  //     if (receivedId === id) {
  //       console.log("Received item: " + item);
  //       setItem(true);
  //       setItemsRemaining((prevItemsRemaining) => prevItemsRemaining - 1);
  //     }
  //   }

  //   socket.on("receive-survivor-item", receiveItem);

  //   return () => {
  //     socket.off("receive-survivor-item", receiveItem);
  //   };
  // }, [socket, id]);

  useEffect(() => {
    survivor?.housesEntered.includes(id) && setEntered(true);
  }, []);

  function getItem() {
    if (itemsRemaining > 0) {
      setDisplay("Draw an item card");
      setEntered(true);
      socket.emit("get-survivor-item", { code: code, survivor: survivor, houseId: id });
    } else {
      setDisplay("No more items in this house");
      console.log("No more items in this house");
    }
  }

  return (
    <div>
      {display && <p>{display}</p>}
      <button onClick={getItem} disabled={entered}>
        House {id}
      </button>
    </div>
  );
}

export default House;
