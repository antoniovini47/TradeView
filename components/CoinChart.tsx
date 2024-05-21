import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ThemedText } from "@/components/ThemedText";
import { CandlestickChart } from "react-native-wagmi-charts";
import { ThemedView } from "./ThemedView";

type FormattedDataCoinType = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export default function CoinChart(props: { coin: string }) {
  const socketUrl = "wss://fstream.binance.com/";
  const [dataChart, setDataChart] = React.useState([] as FormattedDataCoinType[]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl + "ws/" + props.coin + "@kline_1m"
  );

  const [formattedDataCoin, setFormattedDataCoin] = React.useState<FormattedDataCoinType>({
    timestamp: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  });

  useEffect(() => {
    if (connectionStatus == "Open" && lastMessage && lastMessage.data != null) {
      const data = JSON.parse(lastMessage.data);
      setFormattedDataCoin({
        timestamp: data.k.t,
        open: data.k.o,
        high: data.k.h,
        low: data.k.l,
        close: data.k.c,
      });
      if (formattedDataCoin.timestamp === 0) return;
      if (dataChart.length > 10) {
        setDataChart([...dataChart.slice(1), formattedDataCoin]);
      } else {
        setDataChart([...dataChart, formattedDataCoin]);
      }
      console.log("Data chart", dataChart);
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
    <ThemedView>
      <ThemedText type="title">{formattedTextCoin}</ThemedText>
      <ThemedText>
        Preço:
        {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
          <ThemedText> {JSON.parse(lastMessage.data).k.c}</ThemedText>
        ) : (
          <ThemedText> Loading...</ThemedText>
        )}
      </ThemedText>
      <ThemedText>
        Quantidade:
        {connectionStatus == "Open" && lastMessage && lastMessage.data != null ? (
          <ThemedText> {JSON.parse(lastMessage.data).k.q}</ThemedText>
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
    </ThemedView>
  );
}
