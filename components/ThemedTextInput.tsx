import React, { forwardRef } from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "search" | "addCoin";
};

export const ThemedTextInput = React.forwardRef<TextInput, ThemedTextInputProps>(
  ({ style, lightColor, darkColor, type = "default", ...rest }, ref) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "textInput");

    return (
      <TextInput
        ref={ref}
        style={[
          {
            color,
            height: 50,
            width: "100%",
            borderWidth: 2,
            borderColor: color,
            borderCurve: "circular",
            borderRadius: 20,
            padding: 10,
          },
          type === "default" ? styles.default : undefined,
          type === "search" ? styles.search : undefined,
          type === "search" ? styles.addCoin : undefined,
        ]}
        placeholder={
          type === "search" ? "Search..." : type === "addCoin" ? "Add coin..." : "Type here..."
        }
        {...rest}
      />
    );
  }
);
const styles = StyleSheet.create({
  default: {
    //Specifics configs
  },
  search: {
    //Specifics configs
  },
  addCoin: {},
});
