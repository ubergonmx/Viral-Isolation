const items = [
  { name: "keycard", count: 4 },
  { name: "cure", count: 8 },
  { name: "adrenaline", count: 6 },
  { name: "food", count: 6 },
  { name: "frying pan", count: 4 },
  { name: "baseball bat", count: 2 },
  { name: "trap", count: 4 },
  { name: "swapper", count: 5 },
  { name: "summoner", count: 5 },
];

const scatteredItems = [];

// randomly shuffle items array
const shuffledItems = items.sort(() => Math.random() - 0.5);

// distribute items randomly with counts
shuffledItems.forEach(({ name, count }) => {
  for (let i = 0; i < count; i++) {
    scatteredItems.splice(Math.floor(Math.random() * scatteredItems.length), 0, name);
  }
});

console.log(scatteredItems);

export const socketEvents = (io, socket) => {
  console.log(`Vite User ${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
  socket.on("getItem", (data) => {
    socket.broadcast.to(data.room).emit("useItem", data);
    console.log(`User ${socket.id} entered House ${data} and got an item!`);
    let random = Math.floor(Math.random() * 44) + 1;
    io.emit("receiveItem", data, scatteredItems[random]);
  });
};
