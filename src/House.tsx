import { useState, useEffect } from "react";
import { useSocket } from "./context/SocketContext";

function House({ id, itemCapacity }: { id: number; itemCapacity: number }) {
  const [itemsRemaining, setItemsRemaining] = useState(itemCapacity);
  const [itemName, setItemName] = useState("");
  const socket = useSocket();

  useEffect(() => {
    function handleReceiveItem(receivedId: number, item: string) {
      if (receivedId === id) {
        console.log("Received item: " + item);
        setItemName(item);
        setItemsRemaining((prevItemsRemaining) => prevItemsRemaining - 1);
      }
    }

    socket.on("receiveItem", handleReceiveItem);

    return () => {
      socket.off("receiveItem", handleReceiveItem);
    };
  }, [socket, id]);

  function handleGetItem() {
    if (itemsRemaining > 0) {
      socket.emit("getItem", id);
    }
  }

  return (
    <div>
      <h2>House {id}</h2>
      {itemName && <p>Item received: {itemName}</p>}
      <p>Item Slots: {itemsRemaining}</p>
      <button onClick={handleGetItem}>Get Item</button>
    </div>
  );
}

export default House;
