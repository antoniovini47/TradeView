import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ThemedText } from "@/components/ThemedText";
import { CandlestickChart, LineChart } from "react-native-wagmi-charts";
import { ThemedView } from "./ThemedView";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CoinTradeStats from "./CoinTradeStats";

type FormattedDataCoinTypeCandle = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

type FormattedDataCoinTypeLine = {
  timestamp: number;
  value: number;
};

const CHART_LIMIT_RENDER_CANDLE = 10;
const CHART_LIMIT_RENDER_LINE = 20;

export default function CoinChart(props: { coin: string }) {
  const socketUrl = "wss://fstream.binance.com/";
  const [dataCandleChart, setDataCandleChart] = React.useState([] as FormattedDataCoinTypeCandle[]);
  const [dataLineChart, setDataLineChart] = React.useState([
    {
      timestamp: 0,
      value: 0,
    },
  ]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl + "ws/" + props.coin + "@kline_1m"
  );

  const [formattedDataCoinCandle, setFormattedDataCoinCandle] =
    React.useState<FormattedDataCoinTypeCandle>({
      timestamp: 0,
      open: 0,
      high: 0,
      low: 0,
      close: 0,
    });

  const [formattedDataCoinLine, setFormattedDataCoinLine] =
    React.useState<FormattedDataCoinTypeLine>({
      timestamp: 0,
      value: 0,
    });

  useEffect(() => {
    if (connectionStatus == "Open" && lastMessage && lastMessage.data != null) {
      const data = JSON.parse(lastMessage.data);
      setFormattedDataCoinCandle({
        timestamp: data.k.t,
        open: data.k.o,
        high: data.k.h,
        low: data.k.l,
        close: data.k.c,
      });
      if (formattedDataCoinCandle.timestamp === 0) return;
      if (dataCandleChart.length > CHART_LIMIT_RENDER_CANDLE) {
        setDataCandleChart([...dataCandleChart.slice(1), formattedDataCoinCandle]);
      } else {
        setDataCandleChart([...dataCandleChart, formattedDataCoinCandle]);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (connectionStatus == "Open" && lastMessage && lastMessage.data != null) {
      const data = JSON.parse(lastMessage.data);
      setFormattedDataCoinLine({
        timestamp: data.k.t,
        value: data.k.c,
      });
      if (formattedDataCoinLine.timestamp === 0) return;
      if (dataLineChart.length > CHART_LIMIT_RENDER_LINE) {
        setDataLineChart([...dataLineChart.slice(1), formattedDataCoinLine]);
      } else {
        setDataLineChart([...dataLineChart, formattedDataCoinLine]);
      }
      // console.log(dataLineChart);
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
      <CoinTradeStats coin={props.coin} type="full" />
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
      <ThemedView>
        <CandlestickChart.Provider data={dataCandleChart}>
          <CandlestickChart>
            <CandlestickChart.Candles />
          </CandlestickChart>
          <CandlestickChart.PriceText type="open" />
          <CandlestickChart.PriceText type="high" />
          <CandlestickChart.PriceText type="low" />
          <CandlestickChart.PriceText type="close" />
          <CandlestickChart.DatetimeText />
        </CandlestickChart.Provider>
      </ThemedView>
      <View>
        <LineChart.Provider data={dataLineChart}>
          <LineChart>
            <LineChart.Path />
            {/* <LineChart.CursorCrosshair /> */}
          </LineChart>
          <LineChart.PriceText />
          <LineChart.DatetimeText />
        </LineChart.Provider>
      </View>
      {/* </GestureHandlerRootView> */}
    </ThemedView>
  );
}
