import { TouchableOpacity, type TouchableOpacityProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "search";
};

export function ThemedTouchableOpacity({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTouchableOpacityProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "touchableOpacity");

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: color,
        },
        type === "default" ? styles.default : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    //Specifics configs
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
