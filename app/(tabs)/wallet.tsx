import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/wallet-logo.png")} style={styles.reactLogo} />
      }>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">Your balance: $ 1.000,00</ThemedText>
        <ThemedText type="subtitle">Available for withdrawal: $ 850,00</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText type="defaultSemiBold">BTC balance:</ThemedText>
        <ThemedText type="subtitle">0.025469 BTC</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText type="defaultSemiBold">BNC balance:</ThemedText>
        <ThemedText type="subtitle">42.5894 BTC</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
