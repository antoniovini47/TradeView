import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

const limitHistory = 2;

export default function CoinTradeStats(props: { coin: string }) {
  const socketUrl = "wss://fstream.binance.com/";

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl + "ws/" + props.coin + "@aggTrade"
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
    <View>
      <ThemedText>Websocket Status: {connectionStatus}</ThemedText>
      <ThemedText>
        Última cotação ({formattedCoin}):
        {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
          <ThemedText> {JSON.parse(lastMessage.data).p}</ThemedText>
        ) : (
          <ThemedText> Esperando conexão...</ThemedText>
        )}
      </ThemedText>
    </View>
  );
}
