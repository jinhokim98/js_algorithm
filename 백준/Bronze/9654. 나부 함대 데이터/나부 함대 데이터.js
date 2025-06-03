const ships = [
  ["N2 Bomber", "Heavy Fighter", "Limited", "21"],
  ["J-Type 327", "Light Combat", "Unlimited", "1"],
  ["NX Cruiser", "Medium Fighter", "Limited", "18"],
  ["N1 Starfighter", "Medium Fighter", "Unlimited", "25"],
  ["Royal Cruiser", "Light Combat", "Limited", "4"]
];

function format(text, width) {
  return text.padEnd(width, ' ');
}

console.log(
  format("SHIP NAME", 15) +
  format("CLASS", 15) +
  format("DEPLOYMENT", 11) +
  format("IN SERVICE", 10)
);

for (const ship of ships) {
  console.log(
    format(ship[0], 15) +
    format(ship[1], 15) +
    format(ship[2], 11) +
    format(ship[3], 10)
  );
}
