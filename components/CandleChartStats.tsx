import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { CandlestickChart } from "react-native-wagmi-charts";
import { ThemedView } from "./ThemedView";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type FormattedDataCoinTypeCandle = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

const CHART_LIMIT_RENDER_CANDLE = 10;

export default function CandleChartStats(props: { coin: string }) {
  const socketUrl = "wss://fstream.binance.com/";
  const [dataCandleChart, setDataCandleChart] = React.useState([] as FormattedDataCoinTypeCandle[]);

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

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <ThemedView>
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
      <ThemedView>
        <CandlestickChart.Provider data={dataCandleChart}>
          <CandlestickChart>
            <CandlestickChart.Candles />
            {__DEV__ ? null : (
              <CandlestickChart.Crosshair>
                <CandlestickChart.Tooltip />
              </CandlestickChart.Crosshair>
            )}
          </CandlestickChart>
          <CandlestickChart.PriceText type="open" />
          <CandlestickChart.PriceText type="high" />
          <CandlestickChart.PriceText type="low" />
          <CandlestickChart.PriceText type="close" />
          <CandlestickChart.DatetimeText />
        </CandlestickChart.Provider>
      </ThemedView>
      {/* </GestureHandlerRootView> */}
    </ThemedView>
  );
}
