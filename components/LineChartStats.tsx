import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { LineChart } from "react-native-wagmi-charts";
import { ThemedView } from "./ThemedView";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";

type FormattedDataCoinTypeLine = {
  timestamp: number;
  value: number;
};

const CHART_LIMIT_RENDER_LINE = 20;

export default function LineChartStats(props: { coin: string }) {
  const socketUrl = "wss://fstream.binance.com/";
  const [dataLineChart, setDataLineChart] = React.useState([
    {
      timestamp: 0,
      value: 0,
    },
  ]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl + "ws/" + props.coin + "@kline_1m"
  );

  const [formattedDataCoinLine, setFormattedDataCoinLine] =
    React.useState<FormattedDataCoinTypeLine>({
      timestamp: 0,
      value: 0,
    });

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

  return (
    <ThemedView>
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
      <View>
        <LineChart.Provider data={dataLineChart}>
          <LineChart>
            {useColorScheme() === "dark" ? (
              <LineChart.Path color="#0BB8F0" />
            ) : (
              <LineChart.Path color="#087EA4" />
            )}

            {__DEV__ ? null : (
              <LineChart.CursorCrosshair>
                <LineChart.Tooltip />
              </LineChart.CursorCrosshair>
            )}
          </LineChart>
          <LineChart.PriceText />
          <LineChart.DatetimeText />
        </LineChart.Provider>
      </View>
      {/* </GestureHandlerRootView> */}
    </ThemedView>
  );
}
