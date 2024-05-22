import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="charts"
        options={{
          title: "Charts",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "stats-chart" : "stats-chart-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="prices"
        options={{
          title: "Prices",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "cash" : "cash-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "My Wallet",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "wallet" : "wallet-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "information-circle" : "information-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
