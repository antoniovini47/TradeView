import React from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "@/app/(tabs)/styles";

export default function CoinTradeStats(props: { coin: string; type?: string }) {
  const socketUrl = "wss://fstream.binance.com/";

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl + "ws/" + props.coin + "@kline_1d"
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const formattedCoin = `${props.coin.slice(0, 3).toUpperCase()}/${props.coin
    .slice(3, 6)
    .toUpperCase()}`;

  return (
    <View style={styles.coinTradeStatsViewContainerParent}>
      <ThemedText type="title">{formattedCoin}</ThemedText>
      <ThemedText>
        Price:
        {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
          <ThemedText> {JSON.parse(lastMessage.data).k.c}</ThemedText>
        ) : (
          <ThemedText> Loading...</ThemedText>
        )}
      </ThemedText>
      {props.type === "full" ? (
        <>
          <ThemedText type="defaultSemiBold">LAST 24 HOURS</ThemedText>
          <ThemedText>
            Open:
            {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
              <ThemedText> {JSON.parse(lastMessage.data).k.o}</ThemedText>
            ) : (
              <ThemedText> Loading...</ThemedText>
            )}
          </ThemedText>
          <ThemedText>
            High:
            {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
              <ThemedText> {JSON.parse(lastMessage.data).k.h}</ThemedText>
            ) : (
              <ThemedText> Loading...</ThemedText>
            )}
          </ThemedText>
          <ThemedText>
            Low:
            {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
              <ThemedText> {JSON.parse(lastMessage.data).k.l}</ThemedText>
            ) : (
              <ThemedText> Loading...</ThemedText>
            )}
          </ThemedText>
          <ThemedText>
            Close:
            {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
              <ThemedText> {JSON.parse(lastMessage.data).k.c}</ThemedText>
            ) : (
              <ThemedText> Loading...</ThemedText>
            )}
          </ThemedText>
          <ThemedText>
            Trades:
            {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
              <ThemedText> {JSON.parse(lastMessage.data).k.n}</ThemedText>
            ) : (
              <ThemedText> Loading...</ThemedText>
            )}
          </ThemedText>
          <ThemedText>
            Volume:
            {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
              <ThemedText> {JSON.parse(lastMessage.data).k.v}</ThemedText>
            ) : (
              <ThemedText> Loading...</ThemedText>
            )}
          </ThemedText>
        </>
      ) : null}
    </View>
  );
}
