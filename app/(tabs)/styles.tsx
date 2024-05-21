import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  coinTradeStatsViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },
  textInputSearch: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: "100%",
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
