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

module.exports = { scatteredItems };
