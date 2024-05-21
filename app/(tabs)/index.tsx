import React from "react";

import {
  Image,
  ScrollView,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { styles } from "./styles";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CoinTradeStats from "@/components/CoinTradeStats";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function HomeScreen() {
  const [followedCoins, setFollowedCoins] = React.useState(["bnbusdt", "btcusdt", "ethusdt"]);
  function handleRemoveCoin(coin: string) {
    setFollowedCoins(followedCoins.filter((c) => c !== coin));
    console.log("unfollowed: ", coin);
  }

  function handleAddSearch() {
    setFollowedCoins([...followedCoins, "dogeusdt"]);
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

      <View style={styles.searchViewContainer}>
        <ThemedTextInput type="search" />

        <ThemedTouchableOpacity onPress={handleAddSearch}>
          <ThemedText type="invertedThemeColors">Adicionar</ThemedText>
        </ThemedTouchableOpacity>
      </View>

      <ThemedText type="title">Your followed coins:</ThemedText>
      <ScrollView>
        {followedCoins.map((coin) => (
          <View key={"viewCoin" + coin} style={styles.coinTradeStatsViewContainer}>
            <CoinTradeStats coin={coin} key={coin} />
            <ThemedTouchableOpacity
              key={"buttonUnfollow" + coin}
              onPress={handleRemoveCoin.bind(null, coin)}>
              <ThemedText type="invertedThemeColors">Remover</ThemedText>
            </ThemedTouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}
