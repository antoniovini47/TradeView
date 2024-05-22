export const yourFollowedCoins = ["bnbusdt", "dogeusdt", "ltcusdt"];

export function addFollowedCoin(code: string) {
  yourFollowedCoins.push(code);
}

export function removeFollowedCoin(code: string) {
  yourFollowedCoins.splice(yourFollowedCoins.indexOf(code), 1);
}

export function getFollowedCoins() {
  return yourFollowedCoins;
}

export const allCoinsDB = [
  { name: "Bitcoin", symbol: "BTC", code: "btcusdt" },
  { name: "Ethereum", symbol: "ETH", code: "ethusdt" },
  { name: "Binance Coin", symbol: "BNB", code: "bnbusdt" },
  { name: "Dogecoin", symbol: "DOGE", code: "dogeusdt" },
  { name: "Litecoin", symbol: "LTC", code: "ltcusdt" },
];

export function getAllCoinsDB() {
  return allCoinsDB;
}
