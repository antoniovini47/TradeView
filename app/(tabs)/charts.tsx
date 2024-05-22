import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet, Text, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getAllCoinsDB } from "@/constants/Coins";
import SelectDropdown from "react-native-select-dropdown";
import CoinTradeStats from "@/components/CoinTradeStats";

import React from "react";
import CandleChartStats from "@/components/CandleChartStats";
import LineChartStats from "@/components/LineChartStats";

const coinsOptions = getAllCoinsDB();

export default function ChartsScreen() {
  const [selectedCoin, setSelectedCoin] = React.useState(null);

  function handleCoinSelection(selectedItem, index) {
    setSelectedCoin(selectedItem.code);
    console.log("Selected item");
    console.log(selectedItem, index);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/chart-logo.png")} style={styles.bannerLogo} />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Real-Time Charts</ThemedText>
      </ThemedView>

      <SelectDropdown
        data={coinsOptions}
        onSelect={(selectedItem, index) => {
          handleCoinSelection(selectedItem, index);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.name) || coinsOptions[0].name}
              </Text>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}>
              <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />

      <ThemedView>
        <ThemedView style={styles.containerCoinStats}>
          <CoinTradeStats coin={selectedCoin === null ? "btcusdt" : selectedCoin} type="full" />
        </ThemedView>
        <ThemedView>
          <ThemedText type="subtitle">Line Chart</ThemedText>
          <LineChartStats coin={selectedCoin === null ? "btcusdt" : selectedCoin} />
        </ThemedView>
        <ThemedView>
          <ThemedText type="subtitle">Candlesticks Chart</ThemedText>
          <CandleChartStats coin={selectedCoin === null ? "btcusdt" : selectedCoin} />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  bannerLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  containerCoinStats: {
    marginBottom: 20,
  },
});
