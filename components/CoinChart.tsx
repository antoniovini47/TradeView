import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CandlestickChart } from "react-native-wagmi-charts";
import { ThemedView } from "./ThemedView";

const statsInterval = "1m";

export default function CoinChart(props: { coin: string }) {
  const socketUrl = "wss://fstream.binance.com/";
  const [dataChart, setDataChart] = React.useState([
    {
      timestamp: 1625945400000,
      open: 33575.25,
      high: 33600.52,
      low: 33475.12,
      close: 33520.11,
    },
    {
      timestamp: 1625948100000,
      open: 33215.25,
      high: 33430.52,
      low: 33215.12,
      close: 33420.11,
    },
  ]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl + "ws/" + props.coin + "@kline_" + statsInterval
  );

  const [formattedDataCoin, setFormattedDataCoin] = React.useState({
    timestamp: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  });

  useEffect(() => {
    if (lastMessage && lastMessage.data != null) {
      const data = JSON.parse(lastMessage.data);
      setFormattedDataCoin({
        timestamp: data.E,
        open: data.k.o,
        high: data.k.h,
        low: data.k.l,
        close: data.k.c,
      });
      console.log(`Data coin: ${JSON.stringify(formattedDataCoin)}`);
      setDataChart([...dataChart, formattedDataCoin]);
      console.log(`Data chart: ${JSON.stringify(dataChart)}`);
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const formattedTextCoin = `${props.coin.slice(0, 3).toUpperCase()}/${props.coin
    .slice(3, 6)
    .toUpperCase()}`;

  return (
    <View>
      <ThemedText type="title">{formattedTextCoin}</ThemedText>
      <ThemedText>
        Preço:
        {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
          <ThemedText> {JSON.parse(lastMessage.data).p}</ThemedText>
        ) : (
          <ThemedText> Loading...</ThemedText>
        )}
      </ThemedText>
      <ThemedText>
        Quantidade:
        {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
          <ThemedText> {JSON.parse(lastMessage.data).q}</ThemedText>
        ) : (
          <ThemedText> Loading...</ThemedText>
        )}
      </ThemedText>

      <ThemedView>
        <CandlestickChart.Provider data={dataChart}>
          <CandlestickChart>
            <CandlestickChart.Candles />
          </CandlestickChart>
        </CandlestickChart.Provider>
      </ThemedView>

      <ThemedText>
        JSON Completo:
        {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
          <ThemedText> {JSON.stringify(lastMessage.data)}</ThemedText>
        ) : (
          <ThemedText> Loading...</ThemedText>
        )}
      </ThemedText>
    </View>
  );
}
