const productsArr = [
  {
    name: "Set of 4 rings",
    price: 132,
    select: false,
  },
  {
    name: "Ring",
    price: 76,
    select: false,
  },
  {
    name: "Set of 3 bracelets",
    price: 215,
    select: false,
  },
  {
    name: "Bracelet",
    price: 113,
    select: false,
  },
  {
    name: "Set of 3 necklace",
    price: 300,
    select: false,
  },
  {
    name: "Necklace",
    price: 125,
    select: false,
  },
  {
    name: "Set of 4 earrings",
    price: 200,
    select: false,
  },
  {
    name: "Earrings",
    price: 90,
    select: false,
  },
  {
    name: "Gold chain",
    price: 200,
    select: false,
  },
  {
    name: "Silver chain",
    price: 250,
    select: false,
  },
  {
    name: "Leg bracelet",
    price: 75,
    select: false,
  },
  {
    name: "Set of 5 earrings",
    price: 220,
    select: false,
  },
  {
    name: "Bag",
    price: 200,
    select: false,
  },
  {
    name: "Choker necklace",
    price: 199,
    select: false,
  },
  {
    name: "Glasses",
    price: 175,
    select: false,
  },
  {
    name: "Sunglasses",
    price: 97,
    select: false,
  },
  {
    name: " Bead necklace",
    price: 163,
    select: false,
  },
  {
    name: "Scarf",
    price: 68,
    select: false,
  },
  {
    name: "Hair bands",
    price: 10,
    select: false,
  },
  {
    name: "Leather Wallet",
    price: 156,
    select: false,
  },
  {
    name: "Wallet",
    price: 123,
    select: false,
  },
  {
    name: "Watch",
    price: 123,
    select: false,
  },
  {
    name: "Hat",
    price: 123,
    select: false,
  },
  {
    name: "Gloves",
    price: 123,
    select: false,
  },
  {
    name: "Socks",
    price: 123,
    select: false,
  },
  {
    name: "Umbrella",
    price: 123,
    select: false,
  },
  {
    name: "Shoes",
    price: 13,
    select: false,
  },
  {
    name: "Tie",
    price: 12,
    select: false,
  },
  {
    name: "Hair clip",
    price: 13,
    select: false,
  },
  {
    name: "Airpods",
    price: 231,
    select: false,
  },
];

async function seed(productsModel) {
  await productsModel.insertMany(productsArr);
}

module.exports = seed;
