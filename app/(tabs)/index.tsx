import React from "react";

import { Image, ScrollView, View, Button } from "react-native";

import { styles } from "./styles";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CoinTradeStats from "@/components/CoinTradeStats";

export default function HomeScreen() {
  const [followedCoins, setFollowedCoins] = React.useState(["bnbusdt", "btcusdt", "ethusdt"]);
  function handleRemoveCoin(coin: string) {
    setFollowedCoins(followedCoins.filter((c) => c !== coin));
    console.log("unfollowed: ", coin);
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome, Tom!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedText type="title">Your followed coins:</ThemedText>
      <ScrollView>
        {followedCoins.map((coin) => (
          <View style={styles.coinTradeStatsViewContainer}>
            <CoinTradeStats coin={coin} key={coin} />
            <Button
              title="unfollow"
              key={"unfollow" + coin}
              onPress={handleRemoveCoin.bind(null, coin)}
            />
          </View>
        ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}
