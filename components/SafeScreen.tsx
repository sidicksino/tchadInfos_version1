import { ThemeContext } from "@/context/ThemeContext";
import React, { ReactNode, useContext } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeScreenProps = {
  children: ReactNode;
};

const SafeScreen: React.FC<SafeScreenProps> = ({ children }) => {
  const { COLORS } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        backgroundColor: COLORS.card,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
